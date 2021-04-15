// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {get} from '@loopback/rest'
const os = require('os')
const util= require('util')

export class MetricsController {
  constructor() {
    let hostname = os.hostname()
    let cpus = os.cpus()
    let freemem = os.freemem()
  }

  getCpuInfo() {
    let _cpuId=0
    let _r = ""

    os.cpus().forEach( (_cpu: { model: any; speed: any }) =>  {
      _r += util.format(
        "test_os_cpu{cpu='%s', model='%s', speed='%s'}\n",
        _cpuId, _cpu.model, _cpu.speed )
      _cpuId++
    })

    return _r
  }

  @get('/metrics')
  metrics(): string {
    let _loadavg = os.loadavg()

    return util.format("test_os_hostname %s\n\
test_os_cpus_total_count %d\n\
%s\
test_os_freemem %f\n\
test_os_loadavg_1 %f\n\
test_os_loadavg_5 %f\n\
test_os_loadavg_15 %f\n\
test_os_platform %s\n\
test_os_total_mem %d\n\
test_os_uptime %d\n",
    os.hostname(),
    os.cpus().length,
    this.getCpuInfo(),
    os.freemem()/1024/1024,
    _loadavg.shift(),
    _loadavg.shift(),
    _loadavg.shift(),
    os.platform(),
    os.totalmem(),
    os.uptime()
    )
  }
}
