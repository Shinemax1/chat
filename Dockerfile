 # Create app directory
FROM chug/ubuntu14.04x64
RUN apt-get update
RUN apt-get indtall vim
RUN apt-get indtall git
RUN apt-get indtall pm2
RUN apt-get indtall node
RUN mkdir -p /home/Service
 # Bundle app source
WORKDIR /home/Service   
COPY . /home/Service
EXPOSE 8888
# CMD npm start   
 ## 如果想运行多条指令可以这样：
## CMD git pull && npm install && npm start