module.exports = (function () {
  return {
    local: { // localhost
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '',
      database: ''
    },
    real: { // real server db info
      host: '',
      port: '',
      user: '',
      password: '!',
      database: ''
    },
    dev: { // dev server db info
      host: 'jewoo87.ipdisk.co.kr',
      port: '3306',
      user: 'test',
      password: '1234',
      database: 'equipment'
    }
  }
})();