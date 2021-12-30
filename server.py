from flask import Flask
from flask import request
from flask import jsonify
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from flask_ngrok import run_with_ngrok
from bson.json_util import dumps
from bson.json_util import loads

app = Flask(__name__)
CORS(app, support_credentials=True)
run_with_ngrok(app)
connection_string = "mongodb+srv://testuser:015911346@cluster0.tbsfv.mongodb.net/<dbname>?retryWrites=true&w=majority"

@app.route('/')
def home():
  return '<h1>Hello from Ford</h1>'

#@app.route('/storedata')
#def storedata():

  client=MongoClient(connection_string)
  db=client.final_project

  with open("pokemon_full.csv") as myfile:
    firstline = True
    for line in myfile:
        if firstline:
            mykeys = [x for x in line.strip().split(",")]
            firstline = False
        else:
            values = [d for d in line.strip().split(",")]
            db.pokemons.insert_one({mykeys[n]:values[n] for n in range(0,len(mykeys))})
    
# return '<h3>Storing Finished</h3>'

@app.route('/storedata')
def storedata():

  client=MongoClient(connection_string)
  db=client.final_project

  file = open("pokemon_full.csv")
  next(file)
  for line in file:
    items =line.strip().split(",")
    data = {"id":int(items[0]),"name":items[1],"height":int(items[3]),"weight":int(items[4]),"type":items[6],"attack":int(items[8]),"defense":int(items[9]),"hp":int(items[10]),"special_attack":int(items[11]),"special_defense":int(items[12]),"speed":int(items[13]),"image_url":items[22]}    
    db.pokemon.insert_one(data)
  return '<h3>Storing Finished</h3>'

@app.route('/showdata')
def showdata():

  client=MongoClient(connection_string)
  db=client.final_project
  ret=dict()
  listdata=[]
  
  packdata =[doc for doc in db.pokemon.find({},{"_id":0}).sort("id")]
  id=request.args.get('id')
  if int(id)<700:
    for i in range(int(id),int(id)+20):
      listdata.append(packdata[i])
  if int(id)==700:
    for i in range(int(id),int(id)+21):
      listdata.append(packdata[i])
  
  ret["data"]=listdata
  return jsonify(ret)

@app.route('/versus')
def versus():
  client=MongoClient(connection_string)
  db=client.final_project
  name1=request.args.get('name1')
  name2=request.args.get('name2')
  name11="\""+ name1 + "\""
  name22="\""+ name2 + "\""
  info_1 =db.pokemon.find_one({"name":name11},{"_id":0})
  info_2 =db.pokemon.find_one({"name":name22},{"_id":0})
  sum1=info_1["attack"]+info_1["defense"]+info_1["special_attack"]+info_1["special_defense"]+info_1["hp"]
  sum2=info_2["attack"]+info_2["defense"]+info_2["special_attack"]+info_2["special_defense"]+info_2["hp"]
  result={"name1":name1,"name2":name2,"name1_id":info_1["id"],"name2_id":info_2["id"]}
  if sum1>sum2:
    result["winner"]=name1
    result["loser"]=name2
  if sum1==sum2:
    result["winner"]="Draw"
  if sum1<sum2:
    result["winner"]=name2
    result["loser"]=name1

  return jsonify(result)

@app.route('/findpoke')
def findPoke():

  client=MongoClient(connection_string)
  db=client.final_project
  ret=dict()
  name=request.args.get('name')
  name= "\""+ name + "\""
  info =db.pokemon.find_one({"name":name},{"_id":0})  
  ret["data"]=info
  return jsonify(ret)


@app.route('/stats')
def stats():
  from collections import Counter
  client=MongoClient(connection_string)
  db=client.final_project
  alldata =[docs for docs in db.pokemon.find({},{"_id":0}).sort("id")]

  ret=dict()
  atk_poke=[]
  def_poke=[]
  hp_poke=[]
  wt_poke=[]
  ht_poke=[]
  type_poke=[]

  for i in alldata:
    type_poke.append(i["type"])
    atk_poke.append(i["attack"])
    def_poke.append(i["defense"])
    wt_poke.append(i["weight"])
    ht_poke.append(i["height"])
    hp_poke.append(i["hp"])
  
  ret["max_atk"] =db.pokemon.find_one({"attack":max(atk_poke)},{"_id":0})
  ret["max_def"] =db.pokemon.find_one({"defense":max(def_poke)},{"_id":0})
  ret["max_hp"] =db.pokemon.find_one({"hp":max(hp_poke)},{"_id":0})
  ret["max_wt"] =db.pokemon.find_one({"weight":max(wt_poke)},{"_id":0})
  ret["max_ht"] =db.pokemon.find_one({"height":max(ht_poke)},{"_id":0})
  ret["freq"]=Counter(type_poke).most_common()
  return jsonify(ret)


 


app.run()