#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>


// Set these to run example.
#define FIREBASE_HOST "https://sys-monitoramento-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "CYP4j13NzmVRDjPV1rb5rkTyjrHB6M7zi1qvf3ct"
#define WIFI_SSID "Vitor"
#define WIFI_PASSWORD "vitor000"

const int led_R = D5;
const int led_G = D6;
const int led_B = D7;

#define TRIG D3
#define ECHO D4
#define sensor_iluminacao A0
#define PUBLISH_INTERVAL 2000

FirebaseData monitoramento;

unsigned long duracao;
float medicao_sensor, altura_atual;
float altura_max = 100;
float pi = 3.14;
float raio = 1.50;
float resultado = 0;
int valorLuz = 0;
String state_lampada;
bool publishNewState = true;

void publish(){
  publishNewState = true;
}

void setupPins(){

  pinMode(TRIG,OUTPUT);
  pinMode(ECHO,INPUT);

  pinMode(LED_BUILTIN, OUTPUT);

  pinMode(led_R, OUTPUT);
  digitalWrite(led_R, 0);

  pinMode(led_G, OUTPUT);
  digitalWrite(led_G, 0);

  pinMode(led_B, OUTPUT);
  digitalWrite(led_B, 0);

}

void setupWifi(){
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
}

void setupFirebase(){
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void setup() {
  Serial.begin(115200);

  setupPins();
  setupWifi();    

  setupFirebase();

  delay(2000);
}

void loop() {

  // Apenas publique quando passar o tempo determinado
  if(publishNewState){
    digitalWrite(TRIG, LOW);
    delay(5);
    digitalWrite(TRIG, HIGH);
    delay(10);
    digitalWrite(TRIG, LOW);
    duracao = pulseIn(ECHO, HIGH);
    digitalWrite(LED_BUILTIN, LOW);
  
    medicao_sensor = (duracao*0.034)/2;
    altura_atual = altura_max - medicao_sensor;

    resultado = (pi * raio * raio * altura_atual) / 100;

    if (resultado <= 9) {

      Serial.println("Volume " + String(resultado) + "m³ de preenchimento do silo");

    if(resultado <= 5) {
      
      digitalWrite(LED_BUILTIN, HIGH);
      delay(200);                       
      digitalWrite(LED_BUILTIN, LOW);
      delay(200);

      Serial.println("ATENÇÃO!! Nível crítico");
      
    } else {
      
      digitalWrite(LED_BUILTIN, LOW);
    }
    
  } else {

    Serial.println("Volume não pode ser lido");
    
  }
  
  
    Serial.println("");
    Serial.println("");
  
    valorLuz = analogRead(sensor_iluminacao); 

    if(valorLuz>100){
               
      digitalWrite(led_G, LOW);      
      digitalWrite(led_R,HIGH);
      Serial.println("Lampada apagada"); 
         
    } else {
         
      digitalWrite(led_R, LOW);                    
      digitalWrite(led_G,HIGH);
      Serial.println("Lampada acesa");
      
    }
  
    if(!isnan(resultado) && !isnan(valorLuz)){
      // Manda para o firebase
      Firebase.setFloat(monitoramento, "placa-1/distancia", resultado);
      Firebase.setFloat(monitoramento, "placa-1/luminosidade", valorLuz);
    }else{
      Serial.println("Error Publishing");
    }
  }
  
  delay(200);
}
