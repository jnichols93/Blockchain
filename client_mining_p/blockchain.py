import hashlib
import json
from time import time
from uuid import uuid4

from flask import Flask, jsonify, request

class Blockchain(object):
    def __init__(self):
        self.chain = []
        self.current_transactions = []

        # Create the genesis block
        self.new_block(previous_hash=1, proof=100)

    def new_block(self, proof, previous_hash=None):

        block = {
        'index' : len(self.chain) + 1,
        'timestamp' : time(),
        'transactions' : self.current_transactions,
        'proof' : proof,
        'previous_hash' : previous_hash or self.hash(self.last_block)
        }
        # Reset the current list of transactions
        self.current_transactions = []
        # Append the chain to the block
        self.chain.append(block)
        # Return the new block
        return block
    
    def hash(self, block):
        block_string = json.dumps(block, sort_keys = True)
        block_hash = hashlib.sha256(block_string.encode())
        return block_hash.hexdigest()
    @property
    def last_block(self):
        return self.chain[-1]

    @staticmethod
    def valid_proof(block_string, proof):
        block_string = json.dumps('block', sort_keys=True)
        guess = f'{block_string}{proof}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:3] == "000"


# Instantiate our Node
app = Flask(__name__)

# Generate a globally unique address for this node
node_identifier = str(uuid4()).replace('-', '')

# Instantiate the Blockchain
blockchain = Blockchain()


@app.route('/mine', methods=['POST'])
def mine():
    
    data = request.get_json()
    
    if not data['proof'] or not data['id']:
        return jsonify({'message': 'Missing "proof" or "id"'}), 400
    # forge the new block by adding it to chain with proof
    if blockchain.valid_proof(blockchain.last_block, data['proof']):
        new_block = blockchain.new_block(data['proof'])

        response ={
        # send a json response with new block
        'message':'New Block Forged',
        'newBlock': new_block,
        }
    else:
        response ={
            'message': 'No block 4 u, try again.'
        }
    return jsonify(response), 200

@app.route('/last_block', methods = ['GET'])
def get_last():
    response = {
        'lastBlock': blockchain.last_block
    }
    return jsonify(response), 200
    
@app.route('/chain', methods=['GET'])
def full_chain():
    response = {
        'chain':blockchain.chain,
        'length': len(blockchain.chain)
    }
    return jsonify(response), 200


# Run the program on port 5000
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
