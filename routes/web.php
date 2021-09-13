<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//Front-end
Route::get('/', 'HomeController@index');
Route::get('/home', 'HomeController@index');

//Side bar menu Cate and Brand
Route::get('/danh-muc-san-pham','HomeController@getCategory');
Route::get('/brand','HomeController@getBrand');


// ===============================BACK END=====================================
//Admin
Route::get('/admin', 'AdminController@index');
Route::get('/dashboard', 'AdminController@dashboard');
Route::post('/admin-dashboard', 'AdminController@loginDashboard');
Route::get('/logout', 'AdminController@logOut');

// Category
Route::get('/add-category', 'CategoryProduct@addCategory');
Route::get('/list-category', 'CategoryProduct@listCategory');
Route::post('/save-category', 'CategoryProduct@saveCategory');

Route::get('/unactive-category/{category_id}', 'CategoryProduct@unactiveCategory');
Route::get('/active-category/{category_id}', 'CategoryProduct@activeCategory');

Route::get('/edit-category/{category_id}', 'CategoryProduct@editCategory');
Route::get('/delete-category/{category_id}', 'CategoryProduct@deleteCategory');
Route::post('/update-category/{category_id}','CategoryProduct@updateCategory');

//Brand
Route::get('/add-brand', 'Brand@addBrand');
Route::get('/list-brand', 'Brand@listBrand');
Route::post('/save-brand', 'Brand@saveBrand');

Route::get('/unactive-brand/{brand_id}', 'Brand@unactiveBrand');
Route::get('/active-brand/{brand_id}', 'Brand@activeBrand');

Route::get('/edit-brand/{brand_id}', 'Brand@editBrand');
Route::get('/delete-brand/{brand_id}', 'Brand@deleteBrand');
Route::post('/update-brand/{brand_id}','Brand@updateBrand');

//Product
Route::get('/add-product', 'Product@addProduct');
Route::get('/list-product', 'Product@listProduct');
Route::post('/save-product', 'Product@saveProduct');

Route::get('/unactive-product/{product_id}', 'Product@unactiveProduct');
Route::get('/active-product/{product_id}', 'Product@activeProduct');

Route::get('/edit-product/{product_id}', 'Product@editProduct');
Route::get('/delete-product/{product_id}', 'Product@deleteProduct');
Route::post('/update-product/{product_id}','Product@updateProduct');




