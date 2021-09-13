@extends('adminLayout')
@section('adminContent')
    <div class="row">
        <div class="col-lg-12">
            <section class="panel">
                <header class="panel-heading">
                    Thêm danh mục sản phẩm
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
                        <form role="form" action="{{ URL::to('/save-category') }}" method="post">
                            {{ csrf_field() }}
                            <div class="form-group">
                                <label for="exampleInputEmail1">Tên danh mục</label>
                                <input type="text" name="cate_name" class="form-control" id="exampleInputEmail1"
                                    placeholder="Thêm tên danh mục">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Mô tả danh mục</label>
                                <textarea style="resize:none" rows="12" class="form-control" id="exampleInputPassword1"
                                    name="cate_des" placeholder="Mô tả danh mục"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Trạng thái</label>
                                <select name="cate_status" class="form-control input-lg m-bot15">
                                    <option value="1">Hiển thị</option>
                                    <option value="2">Không hiển thị</option>

                                </select>
                            </div>
                            <button name="addCategory" type="submit" class="btn btn-info">Thêm</button>
                        </form>
                    </div>

                </div>
            </section>

        </div>
    </div>
@endsection
