const shell = require('shelljs');
const _ = require('lodash');

const repoMap = require('./config');

shell.exec('mkdir -p repos')

_.each(repoMap, d=>{
  const path = `repos/${d.name}`;

  // 目录不存在创建目录
  if(!shell.test('-e', path)){
    shell.exec(`git clone ${d.up} ${path}`)
  }

  shell.exec(`cd ${path} && git pull`)

  shell.exec(`cd ${path} && git remote add fork ${d.fork} `)

  shell.exec(`cd ${path} && git push -u fork master`)
});
