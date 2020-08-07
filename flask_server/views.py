""" Views file """

import os
from app import app
from flask import Flask, flash, redirect, render_template, url_for, jsonify




# Authorized - Cabinet page
@app.route('/', methods=['GET'])
@app.route('/cabinet', methods=['GET'])
def cabinet():
	return render_template('cabinet.html')

# Auth new user
@app.route('/auth', methods=['GET'])
def auth():
	return render_template('auth_page.html')


# ==========================================================================================
# All functions for testing will be placed BELOW
