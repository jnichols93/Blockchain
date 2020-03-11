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

    def proof_of_work(self, block):
        block_string = json.dumps(block, sort_keys = True)

        proof = 3 
        while self.valid_proof(block_string, proof) is False:
            proof += 1
        return proof

    @staticmethod
    def valid_proof(block_string, proof):
        guess = f'{block_string}{proof}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:3] == "000"


# Instantiate our Node
app = Flask(__name__)

# Generate a globally unique address for this node
node_identifier = str(uuid4()).replace('-', '')

# Instantiate the Blockchain
blockchain = Blockchain()

@app.route('/mine', methods=['GET'])
def mine():
    proof = blockchain.proof_of_work(blockchain.last_block)
    previous_hash = blockchain.hash(blockchain.last_block)
    block = blockchain.new_block(proof, previous_hash)

    response = {
        'new_block' : block
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
