# Paste your version of blockchain.py from the basic_block_gp
# folder here
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
        'previous_hash' : previous_hash or self.hash(self.chain[-1])
        }
        # Reset the current list of transactions
        self.current_transactions = []
        # Append the chain to the block
        self.chain.append(block)
        # Return the new block
        return block
    
    def hash(self, block):
        block_string = json.dumps(block, sort_keys = True).encode()
        hash = hashlib.sha256(block_string).hexdigest()
        return hash
    @property
    def last_block(self):
        return self.chain[-1]

    @staticmethod
    def valid_proof(block_string, proof):
        guess = f'{block_string}{proof}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:6] == "000000"


# Instantiate our Node
app = Flask(__name__)

# Generate a globally unique address for this node
node_identifier = str(uuid4()).replace('-', '')

# Instantiate the Blockchain
blockchain = Blockchain()


@app.route('/mine', methods=['POST'])
def mine():
    # chack if block is valid
    data = request.get_json()
    required = ['proof', 'id']

    for key in required:
        if key not in data:
            response = {
                'Error': 'required data not present'
            }
            code = 400
        # check if proof is valid
    else:
        block_string =json.dumps(blockchain.last_block, sort_keys= True)

        miner_proof = data['proof']

        if blockchain.valid_proof(block_string, miner_proof):
            previous_hash = blockchain.hash(blockchain.last_block)
            new_block = blockchain.new_block(miner_proof, previous_hash)

            response = {
                'status': 'success',
                'message': 'New Block Forged',
                'block': new_block
            }
            code = 200
        else:
                response = {
                    'status': 'failure',
                    'message': 'try again',
                    'block': blockchain.last_block
                }
        code = 400
    return jsonify(response), code

@app.route('/last_block', methods = ['GET'])
def get_last():
    response = {
        'block': blockchain.chain[-1]
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
