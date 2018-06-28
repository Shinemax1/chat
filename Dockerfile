 # Create app directory
FROM shinemax/npm2
RUN mkdir -p /var/node2/docker_node
# RUN npm --registry https://registry.npm.taobao.org update -g
# RUN npm install -g n
# RUN n v8.11.0 
COPY . .
 # Bundle app source
WORKDIR . 
# RUN echo "pwdrun: "`pwd`
# RUN npm --registry https://registry.npm.taobao.org  install --production
ENV NODE_ENV production
EXPOSE 8888
CMD npm --registry https://registry.npm.taobao.org  install && npm run build && pm2 start --no-daemon ./build/server/static/js/server.js  
# CMD echo "pwd: "`pwd`
# CMD npm start   
 ## 如果想运行多条指令可以这样：
## CMD git pull && npm install && npm start

#sudo rm -rf /var/node sudo rm -rf /var/log2