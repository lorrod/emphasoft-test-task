"""
App initialization file.
Imports and initializes its main components.
"""

import os
from flask import Flask
from config import Config 				# Project configuration import

# Create Flask app, load app.config
app = Flask(__name__)
app.config.from_object(Config)
app.secret_key = b'eHk\x8d\xd9\x18\xf1\xd9)#\xaaf\x8aK=<'


import views
