import SimpleCrypto from 'simple-crypto-js'

export default function crypto(method, data) {
  const _secretKey = 'hello-voi'
  const simpleCrypto = new SimpleCrypto(_secretKey)

  return simpleCrypto[method](data)
}
