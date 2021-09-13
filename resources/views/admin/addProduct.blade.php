@extends('adminLayout')
@section('adminContent')
    <div class="row">
        <div class="col-lg-12">
            <section class="panel">
                <header class="panel-heading">
                    Thêm sản phẩm
                </header>
                <?php
                $message = Session::get('message');
                if ($message) {
                    echo '<span style="color:green;text-align:center">' . $message . '</span>';
                    Session::put('message', null);
                }
                ?>
                <div class="panel-body">
                    <div class="position-center">
                        <form role="form" action="{{ URL::to('/save-product') }}" method="post" enctype="multipart/form-data">
                            {{ csrf_field() }}
                            <div class="form-group">
                                <label for="exampleInputEmail1">Tên sản phẩm</label>
                                <input type="text" name="pr_name" class="form-control" id="exampleInputEmail1"
                                    placeholder="Thêm tên danh mục">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Danh mục sản phẩm</label>
                                <select name="cate_id" class="form-control input-lg m-bot15">
                                   @foreach ($cate_pr as $key => $value)
                                   <option value="{{$value->cate_id}}">{{$value->cate_name}}</option>
                                   @endforeach
                                   

                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Thương hiệu</label>
                                <select name="br_id" class="form-control input-lg m-bot15">
                                    @foreach ($brand_pr as $key => $value)
                                   <option value="{{$value->br_id}}">{{$value->br_name}}</option>
                                   @endforeach

                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Mô tả sản phẩm</label>
                                <textarea style="resize:none" rows="12" class="form-control" id="exampleInputPassword1"
                                    name="pr_des" placeholder="Mô tả danh mục"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Thông tin chi tiết</label>
                                <textarea style="resize:none" rows="12" class="form-control" id="exampleInputPassword1"
                                    name="pr_content" placeholder="Mô tả danh mục"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Giá sản phẩm</label>
                                <input type="text" name="pr_price" class="form-control" id="exampleInputEmail1"
                                    placeholder="Thêm tên danh mục">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Hình ảnh sản phẩm</label>
                                <input type="file" name="pr_img" class="form-control" id="exampleInputEmail1"
                                    placeholder="Thêm tên danh mục">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Trạng thái</label>
                                <select name="pr_status" class="form-control input-lg m-bot15">
                                    <option value="1">Hiển thị</option>
                                    <option value="2">Không hiển thị</option>

                                </select>
                            </div>
                            <button name="addProduct" type="submit" class="btn btn-info">Thêm</button>
                        </form>
                    </div>

                </div>
            </section>

        </div>
    </div>
@endsection
