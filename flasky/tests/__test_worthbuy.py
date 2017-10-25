# import unittest
# import re
# from flask import url_for,session
# from app import create_app, db
#
# class WorthBuyTestCase(unittest.TestCase):
#
#     def setUp(self):
#         self.app = create_app('testing')
#         self.app_context = self.app.app_context()
#         self.app_context.push()
#         db.create_all()
#         self.client = self.app.test_client(use_cookies=True)
#
#     def tearDown(self):
#         db.session.remove()
#         db.drop_all()
#         self.app_context.pop()
#
#     def testWorthbuy(self):
#
#         session['comments'] = "ThisIsTest"
#         response = self.client.post(url_for('main.worthbuy'),session=session.get('comments'))
#         self.assertTrue(re.search('ThisIsTest',response.data))
#
#
#
#
