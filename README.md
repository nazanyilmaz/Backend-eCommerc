# Backend e-commerc

<p>
Customers can; create a new user, log in to the site, log out from the site, and renew their password. If you are logged in as admin, you can add new products, delete them, and update them. All the necessary endpoints for creating an e-commerce site have been created.
</p>

# Technologies Used

- MongoDB, Express,
- - Other Libraries: bcryptjs, body-parser, cloudinary, dotenv,cookie-parser, cors, jsonwebtoken, mongoose, nodemailer, nodemon, validator

# Backend Routes

- GET /register: Register
- GET /logout: Logout
- GET /me : User Detail
- POST /login : Login
- POST /forgotPassword: Forgot Password
- POST /reset/:token: Reset PAssword
- GET /products: All Products
- GET /admin/products: Admin Products
- GET /product/new/:id: Product Detail
- POST /product/new: Create a new Product
- DELETE /products/id : Delete Product
- PATCH /products/id : Update Product

To run the Backendt: type 'npm start'
