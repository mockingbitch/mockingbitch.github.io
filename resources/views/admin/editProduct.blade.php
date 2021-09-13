@extends('adminLayout')
@section('adminContent')
    <div class="row">
        <div class="col-lg-12">
            <section class="panel">
                <header class="panel-heading">
                   Cập nhật sản phẩm
                </header>
                <?php
                $message = Session::get('message');
                if ($message) {
                    echo '<span style="color:green;text-align:center">' . $message . '</span>';
                    Session::put('message', null);
                }
                ?>
                <div class="panel-body">
                    @foreach ($editProduct as $key => $value)
                    <div class="position-center">
                        <form role="form" action="{{ URL::to('/update-product/'.$value->pr_id) }}" method="post" enctype="multipart/form-data">
                            {{ csrf_field() }}
                            <div class="form-group">
                                <label for="exampleInputEmail1">Tên sản phẩm</label>
                                <input type="text" name="pr_name" class="form-control" id="exampleInputEmail1"
                                    value="{{$value->pr_name}}">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Danh mục sản phẩm</label>
                                <select name="cate_id" class="form-control input-lg m-bot15">
                                   @foreach ($cate_pr as $key => $cate_value)
                                   @if ($cate_value->cate_id == $value->cate_id)
                                   <option selected value="{{$cate_value->cate_id}}">{{$cate_value->cate_name}}</option>
                                   @endif
                                   <option value="{{$cate_value->cate_id}}">{{$cate_value->cate_name}}</option>
                                   @endforeach
                                   

                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Thương hiệu</label>
                                <select name="br_id" class="form-control input-lg m-bot15">
                                    @foreach ($brand_pr as $key => $br_value)
                                    @if ($br_value->br_id == $value->br_id)
                                   <option selected value="{{$br_value->br_id}}">{{$br_value->br_name}}</option>
                                   @endif
                                   <option value="{{$br_value->br_id}}">{{$br_value->br_name}}</option>
                                   @endforeach

                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Mô tả sản phẩm</label>
                                <textarea style="resize:none" rows="12" class="form-control" id="exampleInputPassword1"
                                    name="pr_des" placeholder="Mô tả danh mục">{{$value->pr_des}}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Thông tin chi tiết</label>
                                <textarea style="resize:none" rows="12" class="form-control" id="exampleInputPassword1"
                                    name="pr_content" placeholder="Mô tả danh mục">{{$value->pr_content}}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Giá sản phẩm</label>
                                <input type="text" name="pr_price" class="form-control" id="exampleInputEmail1"
                                    placeholder="Thêm tên danh mục" value="{{$value->pr_price}}">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Hình ảnh sản phẩm</label>
                                <br/>
                                <img width= 200 src="{{url('public/uploads/product')}}/{{$value->pr_img}}"  alt="">
                                <input type="file" name="pr_img" class="form-control" id="exampleInputEmail1"
                                    placeholder="Thêm tên danh mục">
                            </div>
                            <button name="updateProduct" type="submit" class="btn btn-info">Cập nhật</button>
                        </form>
                    </div>
                    @endforeach

                </div>
            </section>

        </div>
    </div>
@endsection
