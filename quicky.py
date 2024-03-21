import urllib.request
import json
import re
import serial

#Helper function to remove all the html tags from the direction response
def cleanhtml(raw_html):
  cleanr = re.compile('<.*?>')
  cleantext = re.sub(cleanr, '', raw_html)
  return cleantext

#Retrieve users current location
gps_loc = ''
gps = serial.Serial("dev/ttyACM0", baudrate = 9600)
line = gps.readline()
data = line.split(",")
if data[0] == "$GPRMC":
    if data[2] == 'A':
        gps_loc = data[3]+','+data[5]
        with open ("position.txt", "w") as pos:
            pos.write("%s,%s" % (data[3],data[5]))


#Retrieve directions
map_endpoint = 'https://maps.googleapis.com/maps/api/directions/json?'
api_key = 'AIzaSyCMM7FDRcmlTq9AsdjHWZrpEYMQJPBq7Y8'
origin = input('origin:').replace(' ','+')
destination = input('des: ').replace(' ','+')

nav_request = 'origin={}&destination={}&key={}'.format(origin,destination,api_key)
request = map_endpoint + nav_request

response = urllib.request.urlopen(request).read()
directions = json.loads(response)

steps = directions['routes'][0]['legs'][0]['steps']

for i, s in enumerate(steps):
    print(str(i) + ': ' +  cleanhtml(s['html_instructions']))
