@extends('adminLayout')
@section('adminContent')
    <div class="panel panel-default">
        <div class="panel-heading">
            Danh sách sản phẩm
        </div>
        <?php
        $message = Session::get('message');
        if ($message) {
            echo '<span style="color:green;text-align:center; font-weight:bold;">' . $message . '</span>';
            Session::put('message', null);
        }
        ?>
        <div class="row w3-res-tb">
            <div class="col-sm-5 m-b-xs">
                <select class="input-sm form-control w-sm inline v-middle">
                    <option value="0">Bulk action</option>
                    <option value="1">Delete selected</option>
                    <option value="2">Bulk edit</option>
                    <option value="3">Export</option>
                </select>
                <button class="btn btn-sm btn-default">Apply</button>
            </div>
            <div class="col-sm-4">
            </div>
            <div class="col-sm-3">
                <div class="input-group">
                    <input type="text" class="input-sm form-control" placeholder="Search">
                    <span class="input-group-btn">
                        <button class="btn btn-sm btn-default" type="button">Go!</button>
                    </span>
                </div>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-striped b-t b-light">
                <thead>
                    <tr>
                        <th style="width:20px;">
                            <label class="i-checks m-b-none">
                                <input type="checkbox"><i></i>
                            </label>
                        </th>
                        <th>Tên sản phẩm</th>
                        <th>Danh mục</th>
                        <th>Thương hiệu</th>
                        <th>Mô tả</th>
                        <th>Giá</th>
                        <th>Hình ảnh</th>
                        <th>Trạng thái</th>
                        <th style="width:30px;">Sửa</th>
                        <th style="width:30px;">Xoá</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($listProduct as $key => $value) 
                        <tr>
                            <td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
                            <td>{{ $value->pr_name }}</td>
                            <td>{{$value->cate_name}}</td>
                            <td>{{$value->br_name}} </td>
                            <td>{{ $value->pr_des }}</td>
                            <td>{{ $value->pr_price }}</td>
                            <td><img width="200px" src="public/uploads/product/{{$value->pr_img}}" alt=""></td>
                            <td><span class="text-ellipsis">
                                    <?php
                                        if($value->pr_status == 1) {
                                    ?>
                                    <a href="{{ URL::to('/unactive-product/' . $value->pr_id) }}"><span
                                            class="fa-thumb-styling fa fa-thumbs-up"
                                            style="font-size:28px;color:green"></span></a>
                                    <?php   
                                        }
                                        else{
                                    ?>
                                    <a href="{{ URL::to('/active-product/' . $value->pr_id) }}"><span
                                            class="fa-thumb-styling fa fa-thumbs-down"
                                            style="font-size:28px;color:red"></span></a>
                                    <?php
                                    }
                                    ?>
                                </span></td>

                            <td>
                                <a href="{{URL::to('/edit-product/'.$value->pr_id)}}" class="active" ui-toggle-class="">
                                    <i class="fa fa-pencil-square-o text-success text-active" style="font-size:20px"></i></a>
                            </td>
                            <td>
                                <a onclick="return confirm('Are you fuckin sure about das?')" href="{{URL::to('/delete-product/'.$value->pr_id)}}" class="active" ui-toggle-class="">
                                    <i class="fa fa-times text-danger text" style="font-size:20px"></i></a>
                                </td>     
                            
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <footer class="panel-footer">
            <div class="row">

                <div class="col-sm-5 text-center">
                    <small class="text-muted inline m-t-sm m-b-sm">showing 20-30 of 50 items</small>
                </div>
                <div class="col-sm-7 text-right text-center-xs">
                    <ul class="pagination pagination-sm m-t-none m-b-none">
                        <li><a href=""><i class="fa fa-chevron-left"></i></a></li>
                        <li><a href="">1</a></li>
                        <li><a href="">2</a></li>
                        <li><a href="">3</a></li>
                        <li><a href="">4</a></li>
                        <li><a href=""><i class="fa fa-chevron-right"></i></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    </div>
@endsection
