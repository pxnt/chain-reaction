import { getEnv } from '~/utils/EnvUtils';
import NodeEnv from './NodeEnv'

const BaseURLConfig = {
  API: {
    [NodeEnv.DEV]: 'http://localhost:8080',
    [NodeEnv.PROD]: 'https://api.example.com',
  },
}

const BaseEnvURLConfig = Object.entries(BaseURLConfig).reduce((acc, [key, value]) => {
    acc[key] = value[getEnv()];
    return acc;
  }, {} as Record<string, string>);

export { BaseEnvURLConfig };