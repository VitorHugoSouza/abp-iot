# Sistema de Monitoramento Online - (abp-iot)

### Projeto de IoT II  cujo objetivo é desenvolver uma aplicação onde o Arduino Wemos seja configurado como um cliente TCP que envia informações de luminosidade e distância para um servidor web gerenciar e informar as atividades que os sensores estão sendo utilizados.


###  Curso: [Engenharia de Computação - UNISATC](https://web.satc.edu.br/graduacao/engenharia-da-computacao/)
###  Disciplina: IoT II
###  Professor orientador: [Vagner Rodrigues](https://github.com/vagner-rodrigues)
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