import "dotenv/config";

const eurekaConfig = 
{
  instance: {
    app: 'GS-utilities',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: { '$': process.env.PORT, '@enabled': true },
    vipAddress: 'utilities-microservice',
    statusPageUrl: `http://localhost:${process.env.PORT}`,
    healthCheckUrl: `http://localhost:${process.env.PORT}/health`,
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn'
    }
  },
  eureka: {
    host: process.env.EUREKA_SERVER_HOST,
    port: process.env.EUREKA_SERVER_PORT,
    servicePath: '/eureka/apps/',
  }
}

export default eurekaConfig;