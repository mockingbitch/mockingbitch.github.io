<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
class Brand extends Controller
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
    public function addBrand(){
        $this->AuthLogin();
        return view('admin.addBrand');
    }
    public function listBrand(){
        $this->AuthLogin();
        $list_br = DB::table('tbl_brand')->get();
        $manager_br= view('admin.listBrand')->with('listBrand',$list_br);
        return view('adminLayout')->with('admin.listBrand',$manager_br);
    }
    public function saveBrand(Request $request){
        $this->AuthLogin();
        $data = array();
        $data['br_name'] = $request->br_name;
        $data['br_des'] = $request->br_des;
        $data['br_status'] = $request->br_status;
        DB::table('tbl_brand')->insert($data);
        Session::put('message','Thêm danh mục thành công');
        return  Redirect::to('add-brand');
    }
    public function unactiveBrand($brand_id){
        $this->AuthLogin();
        DB::table('tbl_brand')->where('br_id',$brand_id)->update(['br_status'=>2]);
        Session::put('message','Đã ẩn');
        return Redirect::to('list-brand');
    }
    public function activeBrand($brand_id){
        $this->AuthLogin();
        DB::table('tbl_brand')->where('br_id',$brand_id)->update(['br_status'=>1]);
        Session::put('message','Đã hiển thị');
        return Redirect::to('list-brand');
    }
    public function editBrand($brand_id){
        $this->AuthLogin();
        $edit_br = DB::table('tbl_brand')->where('br_id',$brand_id)->get();
        $manager_br = view('admin.editBrand')->with('editBrand',$edit_br);
        return view('adminLayout')->with('admin.editBrand',$manager_br);
    }
    public function deleteBrand($brand_id){
        $this->AuthLogin();
        DB::table('tbl_brand')->where('br_id',$brand_id)->delete();
        Session::put('message','Sửa danh mục sản phẩm thành công');
        return Redirect::to('list-brand');

    }
    public function updateBrand(Request $request,$brand_id){
        $this->AuthLogin();
        $data = array();
        $data['br_name'] = $request->br_name;
        $data['br_des'] = $request->br_des;
        DB::table('tbl_brand')->where('br_id',$brand_id)->update($data);
        Session::put('message','Xoá danh mục sản phẩm thành công');
        return Redirect::to('list-brand');

    }
}
