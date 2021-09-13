<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){
        $product = DB::table('tbl_product')->where('pr_status','1')->orderby('pr_id','desc')->limit(4)->get();
        $cate_pr = DB::table('tbl_category')->where('cate_status','1')->orderby('cate_id','desc')->get();
        $brand_pr = DB::table('tbl_brand')->where('br_status','1')->orderby('br_id','desc')->get();
        return view('pages.home')->with('category', $cate_pr)->with('brand', $brand_pr)->with('product',$product);
    }
    public function getCategory(){

    }
    public function getBrand(){

    }
}
?>
