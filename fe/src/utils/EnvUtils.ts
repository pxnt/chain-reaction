import NodeEnv from '../config/NodeEnv'

export const isDev = () => import.meta.env.VITE_NODE_ENV === 'dev'

export function getEnv() {
  if (import.meta.env.VITE_NODE_ENV === 'dev')
    return NodeEnv.DEV

  return NodeEnv.PROD
}
