# Sistema de Monitoramento Online - (abp-iot)

### Projeto de IoT II  cujo objetivo é desenvolver uma aplicação onde o Arduino Wemos seja configurado como um cliente TCP que envia informações de luminosidade e distância para um servidor web gerenciar e informar as atividades que os sensores estão sendo utilizados.

###  Disciplina: IoT II
###  Professor: [Vagner Rodrigues](https://github.com/vagner-rodrigues)
###  Acadêmicos: [Vitor Hugo de Souza](https://github.com/VitorHugoSouza) e [Vladson Ramos](https://github.com/vladsonramos)

###  Requisitos:

- Wemos ESP 8266
- Sensor de Luz Fotossensível - Ldr
- Sensor Ultrassônico de distância
- Led
- [Arduino IDE](https://www.arduino.cc/en/software)
- [React](https://pt-br.reactjs.org/)
- [Firebase](https://firebase.google.com/?hl=pt) em Realtime Database


## Desenvolvimento Arduino
### Inclusão das bibliotecas usadas no desenvolvimento.
```
 #include <ArduinoJson.h>
 #include <ESP8266WiFi.h>
 #include <FirebaseESP8266.h>
```
### Definições de inicialização
```
  #define FIREBASE_HOST "https://sys-monitoramento-default-rtdb.firebaseio.com/"
  #define FIREBASE_AUTH "CYP4j13NzmVRDjPV1rb5rkTyjrHB6M7zi1qvf3ct"
  #define WIFI_SSID "SSID"
  #define WIFI_PASSWORD "PASSWORD"
  #define TRIG D3 
  #define ECHO D4 
  #define sensor_iluminacao A0 
  #define PUBLISH_INTERVAL 2000 >
 ```
 
### Indicação do banco de dados.
```
FirebaseData monitoramento;
```
### Inicialização de variaveis.
```
const int led_R = D5;
const int led_G = D6;
const int led_B = D7;
unsigned long duracao;
float medicao_sensor, altura_atual;
float altura_max = 100;
float pi = 3.14;
float raio = 1.50;
float resultado = 0;
int valorLuz = 0;
String state_lampada;
bool publishNewState = true;

```
### Função Publish().

### Função para publicação no banco recebendo valor verdadeiro.

```
void publish(){
  publishNewState = true;
}
```

### Função de configuração dos pinos

### Configura os pinos como saida, entrada e escrita
```
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
```
### Função de Configuração de Conexão do Wi-fi

### Verifica ssid e senha da rede, caso esteja conectado exibe mensagem "Connected"

```
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

```
### Função de configuração do FireBase.
### Inicialização das configurações do host e autenticação.
```
void setupFirebase(){
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}
```
### Função Setup

### Inicialização das funções criado no inicio do projeto

```
void setup() {
  Serial.begin(115200);

  setupPins();
  setupWifi();    

  setupFirebase();

  delay(2000);
}
```

### Função loop.
```
void loop() {

  
  if(publishNewState){
    digitalWrite(TRIG, LOW);
    delay(5);
    digitalWrite(TRIG, HIGH);
    delay(10);
    digitalWrite(TRIG, LOW);
    duracao = pulseIn(ECHO, HIGH);
    digitalWrite(LED_BUILTIN, LOW);
 
 ```
### Calcula distância do sensor.
 ```
    medicao_sensor = (duracao*0.034)/2;
    altura_atual = altura_max - medicao_sensor;
```
### Calcula o volume.
```
    resultado = (pi * raio * raio * altura_atual) / 100;
```

### Compara o volume do silo para enviar os alertas.
```
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
```
### Setando variavel na função analogRead.
```
valorLuz = analogRead(sensor_iluminacao); 
```

### Compara o valor da varialvel para verificar se a luz esta acessa ou apagada
```
    if(valorLuz>100){
               
      digitalWrite(led_G, LOW);      
      digitalWrite(led_R,HIGH);
      Serial.println("Lampada apagada"); 
         
    } else {
         
      digitalWrite(led_R, LOW);                    
      digitalWrite(led_G,HIGH);
      Serial.println("Lampada acesa");
      
    }
  ```
  
  ### Encaminha os dados da placa para o banco de dados.
  ```
    if(!isnan(resultado) && !isnan(valorLuz)){
      Firebase.setFloat(monitoramento, "placa-2/distancia", resultado);
      Firebase.setFloat(monitoramento, "placa-2/luminosidade", valorLuz);
    }else{
      Serial.println("Error Publishing");
    }
  }
  
  delay(200);
}
```

## Desenvolvimento Web



### Libs utilizadas

- [React](https://pt-br.reactjs.org/) 
- [Antd](https://ant.design/docs/react/introduce) - framework para estilização visual
- [Craco](https://www.npmjs.com/package/craco-less) - plugin para edição da estilização
- [Firebase](https://firebase.google.com/?hl=pt) - serviço que recebe as informações dos sensores

Para executar o projeto, capturamos os valores que os sensores enviam para o Firebase em Realtime Database e criamos 3 cards para cada placa. Onde são demonstrados as informações propostas pelo exercício do silo. Cada valor é determinante para uma ação de monitoramento. Elas são, volume do silo, luminosidade e volume atual. Assim cada valor recebido, executa uma ação pré-estabelecida no sistema.

É necessário ter uma conta no Google para configurar o Firebase e o projeto dentro dele. Após criar o projeto, será preciso alterar a configuração de conexão do React com o Firebase, no arquivo (src/services/firebase.js).

Para instalar as libs do projeto execute o comando:
```
npm install
```

Após, execute :)

``` 
npm start
```
