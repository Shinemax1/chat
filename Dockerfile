 # Create app directory
FROM libaozhong/node_pm2
RUN mkdir -p /var/node2/docker_node
RUN npm --registry https://registry.npm.taobao.org install -g n
RUN n v8.11.0 
 # Bundle app source
WORKDIR /var/node2/docker_node   
# COPY . /var/node2/docker_node
ENV NODE_ENV production
EXPOSE 8888
CMD npm --registry https://registry.npm.taobao.org install && npm run build && pm2 start --no-daemon ./build/server/static/js/server.js  
# CMD echo "pwd: "`pwd`
# CMD npm start   
 ## 如果想运行多条指令可以这样：
## CMD git pull && npm install && npm start