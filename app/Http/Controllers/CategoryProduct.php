<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
class CategoryProduct extends Controller
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
    public function addCategory(){
        $this->AuthLogin();
        return view('admin.addCategory');
    }
    public function listCategory(){
        $this->AuthLogin();
        $list_cate = DB::table('tbl_category')->get();
        $manager_cate = view('admin.listCategory')->with('listCategory',$list_cate);
        return view('adminLayout')->with('admin.listCategory',$manager_cate);
    }
    public function saveCategory(Request $request){
        $this->AuthLogin();
        $data = array();
        $data['cate_name'] = $request->cate_name;
        $data['cate_des'] = $request->cate_des;
        $data['cate_status'] = $request->cate_status;
        DB::table('tbl_category')->insert($data);
        Session::put('message','Thêm danh mục thành công');
        return  Redirect::to('add-category');
    }
    public function unactiveCategory($category_id){
        $this->AuthLogin();
        DB::table('tbl_category')->where('cate_id',$category_id)->update(['cate_status'=>2]);
        Session::put('message','Đã ẩn');
        return Redirect::to('list-category');
    }
    public function activeCategory($category_id){
        $this->AuthLogin();
        DB::table('tbl_category')->where('cate_id',$category_id)->update(['cate_status'=>1]);
        Session::put('message','Đã hiển thị');
        return Redirect::to('list-category');
    }
    public function editCategory($category_id){
        $this->AuthLogin();
        $edit_cate = DB::table('tbl_category')->where('cate_id',$category_id)->get();
        $manager_cate = view('admin.editCategory')->with('editCategory',$edit_cate);
        return view('adminLayout')->with('admin.editCategory',$manager_cate);
    }
    public function deleteCategory($category_id){
        $this->AuthLogin();
        DB::table('tbl_category')->where('cate_id',$category_id)->delete();
        Session::put('message','Sửa danh mục sản phẩm thành công');
        return Redirect::to('list-category');

    }
    public function updateCategory(Request $request,$category_id){
        $this->AuthLogin();
        $data = array();
        $data['cate_name'] = $request->cate_name;
        $data['cate_des'] = $request->cate_des;
        DB::table('tbl_category')->where('cate_id',$category_id)->update($data);
        Session::put('message','Xoá danh mục sản phẩm thành công');
        return Redirect::to('list-category');

    }
}
