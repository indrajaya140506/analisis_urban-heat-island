from flask import Flask, request, jsonify 
from flask_cors import CORS 
import ee 
import requests 

app = Flask(__name__)
CORS(app)

ee.Initialize(project="workshop-web-489403")


def get_region_name(coords):
    try:
        lon = coords[0][0][0]
        lat = coords[0][0][1]

        url = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}"

        headers = {
            "User-Agent": "uhi-analysis-app"
        }

        res = requests.get(url, headers=headers, timeout=10).json()
        address = res.get("address", {})

        print("ADDRESS DEBUG:", address)   
        return (
            address.get("region")            
            or address.get("county")
            or address.get("state_district") 
            or address.get("city")
            or address.get("municipality")  
            or address.get("town")
            or address.get("state")
            or "Unknown Region"     
        )

    except Exception:
        return "Unknown Region"
    

def get_lst(year, region):
    start = ee.Date.fromYMD(year, 1, 1)
    end = ee.Date.fromYMD(year, 12, 31)

    collection = (
        ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
        .merge(ee.ImageCollection("LANDSAT/LC09/C02/T1_L2"))
        .filterBounds(region)
        .filterDate(start, end)
        .filter(ee.Filter.lt("CLOUD_COVER", 20))
    )

    image = collection.median()

    lst = (
        image.select("ST_B10")
        .multiply(0.00341802)
        .add(149.0)
        .subtract(273.15)
        .rename("LST")
    )

    return lst



@app.route("/api/uhi", methods=["POST"])
def uhi():
    data = request.json 

    start_year = int(data["start_year"])
    end_year = int(data["end_year"])
    coords = data.get("coordinates")

    
    region_name = "Bali (Default)"

    if coords:
        region = ee.Geometry.Polygon(coords)
        region_name = get_region_name(coords)
    else:
        region = ee.Geometry.Rectangle([114.4, -8.9, 115.8, -8.0])

    years = list(range(start_year, end_year + 1))
    chart_data = []

    
    for y in years:
        lst = get_lst(y, region).clip(region)

        mean = lst.reduceRegion(
            reducer=ee.Reducer.mean(),
            geometry=region,
            scale=1000,
            maxPixels=1e13
        ).get("LST")

        value = mean.getInfo() if mean else 0

        chart_data.append({
            "year": y,
            "lst": round(value, 2)
        })

   
    vis = {
        "min": 20,
        "max": 40,
        "palette": ["blue", "cyan", "green", "yellow", "orange", "red"]
    }

    latest = get_lst(end_year, region).clip(region).getMapId(vis) 

    
    return jsonify({
        "region": region_name,
        "chart": chart_data,
        "tile": latest["tile_fetcher"].url_format
    })


if __name__ == "__main__":
    app.run(debug=True)