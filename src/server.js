const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const ProtoObject = protoLoader.loadSync(
  path.resolve(__dirname, '../proto/phrases.proto')
)
const PhrasesDefinition = grpc.loadPackageDefinition(ProtoObject)

const phrases = [
  {
    author: 'Eder',
    content: 'está ajudando elon musk a desenvolver foguetes',
  },
  {
    author: 'Gabriel',
    content: 'criou um grupo de sinais de criptomoedas',
  },
  {
    author: 'Baiano',
    content: 'abriu uma hamburgueria para jogadores de lol',
  },
]

//remote method
//err, callback
function List(_, callback) {
  return callback(null, { phrases })
}

const server = new grpc.Server()

server.addService(PhrasesDefinition.PhraseService.service, { List })

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
server.start()
console.log('Listening')
