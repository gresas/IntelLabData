## Intel Lab Data

Esse é um projeto que simula o envio dos dados dos sensores para um sistema IoT de processamento em tempo real. Alertas são configurados e disparados via Telegram em caso de algum sensor apresentar comportamento anômalo.

Para definir um comportamento anômalo, foi definido alguns parâmetros de threshold para os atributos de medição. Esses parâmetros podem ser ajustados no arquivo `.env`

## Base de Dados

Os dados utilizados foram coletados de 54 sensores diferentes do Laboratório de Pesquisa Intel Berkeley, entre as datas 28 de Fevereiro e 5 de Abril de 2004.

Os sensores Mica2Dot com placas meteorológicas coletaram informações de topologia com registro de data e hora, juntamente com valores de umidade, temperatura, luz e tensão uma vez a cada 31 segundos. Os dados foram coletados usando o sistema de processamento de consultas em rede TinyDB, construído na plataforma TinyOS.

- O arquivo `data/data.txt` incluí o log de 2.3 milhões de dados coletados dos sensores. O esquema dos dados é o seguinte:

| Data | Tempo | Epoca | SensorId | Temperatura Cº | Humidade | Lux | Voltagem |
|---|---|---|---|---|---|---|---|
| date:yyyy-mm-dd | time:hh:mm:ss.xxx | epoch:int | moteid:int | temperature:real | humidity:real | light:real | voltage:real |

- `data/connectivity.txt` mede a probabilidade de conexão entre dois sensores.

- `data/coordinates.txt` é um arquivo simples, que mostra as coordenadas x e y de cada sensor dentro do laboratório.

## Configuração do ambiente

Para instalar as dependências do projeto, é necessário ter instalado o [NodeJS](https://nodejs.org/en/download/) em sua máquina.

`npm install` - para instalar as dependências <br>

Além disso, é necessário ter uma instância do rabbitMQ em execução, voce pode facilmente criar uma utilizando o comando [Docker](https://docs.docker.com/engine/install/) abaixo: <br>

`docker run -d -it --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management` <br>

## Executando o Projeto...

Antes de mais nada, [crie](https://t.me/botfather) um `TELEGRAM_TOKEN` e o adicione no arquivo de configuração `.env`.

Na primeira vez em que for executar o projeto, é necessário definir o `TELEGRAM_CHAT_ID` para aplicação saber qual(is) chats enviar os alertas, então execute o comando: 

`npm run listen` - para executar o listener <br>

E inicie a conversa com o Bot já configurado IntelLabData2021 no Telegram, enviando a mensagem `/start`. Notará que um ID irá aparecer no console do listener. Copie e cole esse id na variável de ambiente `TELEGRAM_CHAT_ID`. Caso queira adicionar múltiplos IDs, coloque-os separados por vírgula na variável de ambiente Ex.: `TELEGRAM_CHAT_ID=124124512,721124512,127434512`
<br>
Após configurar os IDs do chat e o `TELEGRAM_TOKEN` do Bot, basta reiniciar o listener para carregar as varáveis de ambiente na memória e execute o simulador de envio. Aguarde 30 segundos até o envio começar...:

`npm run fire` - para simular o envio dos dados dos dispositivos <br>

## Ferramentas utilizadas
- Docker version 20.10.8
- NodeJS v10.19.0
- RabbitMQ v3.9


