/*
 * @Author: 董方旭
 * @Date: 2021-03-17 14:29:54
 * @LastEditors: 董方旭
 * @LastEditTime: 2021-03-17 14:30:54
 * @Description: 项目构建版本信息
 */
const child_process = require('child_process');
const moment = require('moment');
let versionInfo = {};
const buildDate = moment().format('YYYY-MM-DD HH:mm:ss');
try {
  // git 最后一次提交的 Head
  const commit = child_process.execSync('git show -s --format=%H').toString().trim();
  // / git 最后一次提交的 userName
  const commitUserName = child_process.execSync('git show -s --format=%cn').toString().trim();
  //  git 最后一次提交的 userMail
  const commitUserMail = child_process.execSync('git show -s --format=%ce').toString().trim();
  const commitDateObj = new Date(child_process.execSync(`git show -s --format=%cd`).toString());
  //  git 最后一次提交的时间
  const commitDate = moment(commitDateObj).format('YYYY-MM-DD HH:mm:ss');
  //  打包构建的userName
  const buildUserName = child_process.execSync('git config user.name').toString().trim();
  //  打包构建的userMail
  const buildUserMail = child_process.execSync('git config user.email').toString().trim();

  versionInfo = { commit, commitUserName, commitUserMail, commitDate, buildUserName, buildUserMail, buildDate };
} catch (error) {
  versionInfo = { commit: '', commitUserName: '', commitUserMail: '', commitDate: '', buildUserName: '', buildUserMail: '', buildDate }
}
console.log('构建信息:');
console.table(versionInfo);

module.exports = { ...versionInfo };