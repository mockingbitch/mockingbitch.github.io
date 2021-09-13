<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;

session_start();
class AdminController extends Controller
{
    public function AuthLogin(){
        $ad_id = Session::get('ad_id');
        if($ad_id){
            return Redirect::to('dashboard');
        }
        else{
            return Redirect::to('admin')->send();
        }
    }
    public function index(){
        return view('adminLogin');
    }
    public function dashboard(){
        // vào folder admin file dashboard.blade.php
        $this->AuthLogin();
        return view('admin.dashboard');     
    }
    public function loginDashboard(Request $request){
        $ad_email = $request->ad_email;
        $ad_password = md5($request->ad_password);
        $result = DB::table('tbl_admin')->where('ad_email',$ad_email)->where('ad_password',$ad_password)->first();
        if($result){
            Session::put('ad_name',$result->ad_name);
            Session::put('ad_id',$result->ad_id);
            return Redirect::to('/dashboard');
        }
        else{
            Session::put('message','Sai tài khoản hoặc mật khẩu');
            return Redirect::to('/admin');
        }
    }
    public function logOut(){
        $this->AuthLogin();
        Session::put('ad_name',null);
        Session::put('ad_id',null);
        return Redirect::to('/admin');
    }
}
