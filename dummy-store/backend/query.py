import databaseCon
import random

con = databaseCon.Database()


# print(con.getProducts())

views = [{'product': '', 'user': '', 'date': ''}]
carts = [{'product': '', 'user': '', 'discarded': False}]
orders = [{'product': '', 'user': '', 'total': 0.0, 'date': ''}]

# combined = [{'product': '', 'user': '', 'views': 0, 'cart': ''}]

# print(con.getUsers())
# print(con.getProducts())
# print(con.getRatings())

# ratings = con.getRatings()
# for x in ratings:
#   print(x)


users = []
def generateDummyData():
  genUsers()
  setViews()

def genUsers():
  usersCount = 0
  con.resetUsers()
  while usersCount < 50:
    con.createUser({'username': 'T' + str(usersCount + 1), 'password': 'T' + str(usersCount + 1)})
    usersCount += 1
    print('user added: ' + str(usersCount))
  users = con.getUsers()
  for x in users: print(x)


usersIds = ['6038e8ed249cfd14db183dec', '6038e8ed249cfd14db183ded', '6038e8ed249cfd14db183dee', '6038e8ed249cfd14db183def', '6038e8ed249cfd14db183df0', '6038e8ed249cfd14db183df1', '6038e8ed249cfd14db183df2', '6038e8ed249cfd14db183df3', '6038e8ed249cfd14db183df4', '6038e8ee249cfd14db183df5', '6038e8ee249cfd14db183df6', '6038e8ee249cfd14db183df7', '6038e8ee249cfd14db183df8', '6038e8ee249cfd14db183df9', '6038e8ee249cfd14db183dfa', '6038e8ee249cfd14db183dfb', '6038e8ee249cfd14db183dfc', '6038e8ee249cfd14db183dfd', '6038e8ee249cfd14db183dfe', '6038e8ee249cfd14db183dff', '6038e8ee249cfd14db183e00', '6038e8ee249cfd14db183e01', '6038e8ee249cfd14db183e02', '6038e8ee249cfd14db183e03', '6038e8ee249cfd14db183e04', '6038e8ee249cfd14db183e05', '6038e8ee249cfd14db183e06', '6038e8ee249cfd14db183e07', '6038e8ee249cfd14db183e08', '6038e8ee249cfd14db183e09', '6038e8ee249cfd14db183e0a', '6038e8ee249cfd14db183e0b', '6038e8ee249cfd14db183e0c', '6038e8ee249cfd14db183e0d', '6038e8ee249cfd14db183e0e', '6038e8ee249cfd14db183e0f', '6038e8ee249cfd14db183e10', '6038e8ee249cfd14db183e11', '6038e8ee249cfd14db183e12', '6038e8ee249cfd14db183e13', '6038e8ee249cfd14db183e14', '6038e8ee249cfd14db183e15', '6038e8ee249cfd14db183e16', '6038e8ee249cfd14db183e17', '6038e8ee249cfd14db183e18', '6038e8ee249cfd14db183e19', '6038e8ef249cfd14db183e1a', '6038e8ef249cfd14db183e1b', '6038e8ef249cfd14db183e1c', '6038e8ef249cfd14db183e1d']
def getUsersIds():
  usersIds = []
  users = con.getUsers()
  for x in users:
    usersIds.append(str(x['_id']))
  print(usersIds)


productsIds = ['60379d0adf24e6b057f4ef73', '60379d0adf24e6b057f4ef74', '60379d0adf24e6b057f4ef75', '60379d0adf24e6b057f4ef76', '60379d0adf24e6b057f4ef77', '60379d0adf24e6b057f4ef78', '60379d0adf24e6b057f4ef79', '60379d0adf24e6b057f4ef7a', '60379d0adf24e6b057f4ef7b']
def getProductsIds():
  productsIds = []
  products = con.getProducts()
  for x in products:
    productsIds.append(str(x['_id']))
  print(productsIds)


views = []
viewsByWeekDays = [40, 50, 80, 90, 30, 50, 70]
dates = ['2021-2-21', '2021-2-22', '2021-2-23', '2021-2-24', '2021-2-25', '2021-2-26', '2021-2-27']
# usersByProduct = [17, 17, 16]
usersByProduct = [30, 10, 10]

productsByCategory = [[0,1,2], [4,5,6], [3,7,8]]
viewsByUserGroups = [6, 4, 10, 8, 12, 14, 7, 8, 6, 7]
def setViews():
  con.resetViews()
  con.resetCarts()

  userGroupsIndex = 0
  userIndex = 0
  userViewCount = 0
  userCount = 0

  productIndex = 0
  productGroupIndex = 0
  usersByProductIndex = 0
  userCount_product = 0
  productCount = 0

  xy = 0

  i = 0
  while i < 7:
    x = 0
    while x < viewsByWeekDays[i]: #410 loop
      # print(
      #       'day ' + str(i + 1)
      #       +'  view: ' + str(x + 1)
      #       +'  group: ' + str(userGroupsIndex + 1)
      #       +'  user:' + str(userCount + 1)
      #       +'  view: ' + str(userViewCount + 1))

      print('dummy data generated: ' + str(xy))
      xy += 1

      user = str(usersIds[userIndex])
      product = str(productsIds[productsByCategory[productGroupIndex][productCount]])
      date = str(dates[i])
      con.createView({'user': user, 'product': product, 'date': date})
      # con.createRating({'user': user, 'product': product, 'rating': 1})

      #generate cart and order
      rating = 1
      if (random.random() < 0.6):
        discarded = random.random() < 0.5
        con.createCart({'user': user, 'product': product, 'discarded': discarded})
        if not discarded:
          rating = 3
          if (random.random() < 0.5):
            rating = 5
            con.createOrder({'user': user, 'product': product, 'date': date, 'total': 50.00})
            print('order')


      con.createRating({'user': user, 'product': product, 'rating': rating})



      productCount += 1
      if (productCount == 3):
        productCount = 0

      if (userCount_product == usersByProduct[productGroupIndex]):
        userCount_product = 0
        # usersByProductIndex += 1
        productGroupIndex += 1

      # user = usersIds[userIndex]
      userViewCount += 1
      if (userViewCount == viewsByUserGroups[userGroupsIndex]):
        #change user
        userViewCount = 0
        userIndex += 1
        userCount += 1
        userCount_product += 1
      if (userCount == 5):
        userCount = 0
        userGroupsIndex += 1
      x += 1
    i += 1

  # print(con.getViews())


def setCarts():
  con.resetCarts()

  views = con.getViews()
  for x in views:
    # print(random.random() < 0.3)
    if (random.random() < 0.6):
      discarded = random.random() < 0.5
      con.createCart({'user': x['user'], 'product': x['product'], 'discarded': discarded})
      if discarded:
        rating = 1
      else:
        rating = 3
        # if (random.random() < 0.5):

      con.createRating({'user': x['user'], 'product': x['product'], 'rating': rating})
      print('discarded: ' + str(discarded))
    else:
      print('skip')
  # print(con.getViews())



def getCarts():
  for x in con.getCarts():
    print(x)

def getProducts():
  for x in con.getProducts():
    print(x)

generateDummyData()
# setCarts()
# getCarts()
# getProductsIds()
# setViews()
# genUsers()
# getUsersIds()
# getProducts()
