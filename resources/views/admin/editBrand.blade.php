@extends('adminLayout')
@section('adminContent')
    <div class="row">
        <div class="col-lg-12">
            <section class="panel">
                <header class="panel-heading">
                    Sửa thương hiệu
                </header>
                <?php
                $message = Session::get('message');
                if ($message) {
                    echo '<span style="color:green;text-align:center">' . $message . '</span>';
                    Session::put('message', null);
                }
                ?>
                <div class="panel-body">
                    @foreach ($editBrand as $key => $value)
                    <div class="position-center">
                        <form role="form" action="{{ URL::to('/update-brand/'.$value->br_id) }}" method="post">
                            {{ csrf_field() }}
                            <div class="form-group">
                                <label for="exampleInputEmail1">Tên danh mục</label>
                                <input type="text" name="br_name" class="form-control" id="exampleInputEmail1"
                                   value="{{$value->br_name}}">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Mô tả danh mục</label>
                                <textarea style="resize:none" rows="12" class="form-control" id="exampleInputPassword1"
                                    name="br_des">{{$value->br_des}}</textarea>
                            </div>
                            <button name="addBrand" type="submit" class="btn btn-info">Thêm</button>
                        </form>
                    </div>
                    @endforeach

                </div>
            </section>

        </div>
    </div>
@endsection
