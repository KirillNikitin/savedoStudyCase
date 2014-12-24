The application is a single-page application which lets to user: 
- view personal bank account details, 
- create new payees, 
- edit existed payees, 
- make transactions as money transfers to existed payees,
- view the list of completed transactions and the rest of money on the amount.

I have created a json of three users, who already are in the list (just for example). json is loading on the first application opening. 
The user is able to edit any of them as well as any of new created payees. In «Make a payment» user can just select anybody of existed users and write down the sum which is needed to be transferred. All other data as a name of Bank and CreditCard number is loading automatically according to selected user details. I have not created any possibility to select date, because it is unclear how a user should be able to manage date. Should it be possibillity to select date in past (one week ago f.e.) or some date in the future. I can add such option as a date selection to the application if you could explain me what you’d exactly like to see.
On click transfer button the transaction is proceeding to the transaction list and localstorage. Transaction list is possible to view at section ‘balance’.

Resume:
The front-end side of application is made on Angulal js. I have chosen it because I suppose Angular perfectly suitable for single page applications development.
I am not professional with Angular and therefore it took approx. 10 hours to create this application.
I haven’t created many things such as right validation of input form (Validated only form of input sum amount in ‘Make payment’ section).
Values of sum transferred to payees in the transaction list should be the links to pages of every single transaction details.
I haven’t put date of transaction in transaction list and have not made sorting. I can make everything of these, just need more time.  

In the project are being used links based on routes. It is not possible to get access to any section via direct link, because I am not using configured web-server. If the application would be based on configured web-server, therefore it would response index.html on any url request. 

The application is created without any back-end side and database. All the data is stored in browser localstorage. To clear localstorage, please use browser settings or write down in the browser console ‘localStorage.clear()’ and press the ‘Enter’ key. 
