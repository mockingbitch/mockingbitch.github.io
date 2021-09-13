@extends('layout')
@section('content')
<aside id="fh5co-hero">
			<div class="container">
				<div class="row">
					<div class="col-md-8">
						<div class="flexslider animate-box">
							<ul class="slides">
							   <li style="background-image:  url(public/frontend/images/slide1.png);">
								   <div class="overlay-gradient"></div>
								   <div class="container-fluid">
									   <div class="row">
										   <div class="col-md-10 col-md-offset-1 slider-text">
											   <div class="slider-text-inner">
												   <h1>Doomsday Clock</h1>
													<h2>Lorem ipsum dolor sit amet, consectetur adip</h2>
													<p class="ct"><a href="#">Đọc tiếp <i class="icon-arrow-right"></i></a></p>
											   </div>
										   </div>
									   </div>
								   </div>
							   </li>
							   <li style="background-image: url(public/frontend/images/slide2.png);">
								   <div class="overlay-gradient"></div>
								   <div class="container-fluid">
									   <div class="row">
										   <div class="col-md-10 col-md-offset-1 slider-text">
											   <div class="slider-text-inner">
												   <h1>Batman &amp; Hush</h1>
													<h2>Lorem ipsum dolor sit amet, consectetur adip</h2>
													<p class="ct"><a href="#">Đọc tiếp <i class="icon-arrow-right"></i></a></p>
											   </div>
										   </div>
									   </div>
								   </div>
							   </li>
							   <li style="background-image: url(public/frontend/images/slide3.png);">
								   <div class="overlay-gradient"></div>
								   <div class="container-fluid">
									   <div class="row">
										   <div class="col-md-10 col-md-offset-1 slider-text">
											   <div class="slider-text-inner">
												   <h1>Con nhện ngu đần</h1>
													<h2>Lorem ipsum dolor sit amet, consectetur adip</h2>
													<p class="ct"><a href="#">Đọc tiếp <i class="icon-arrow-right"></i></a></p>
											   </div>
										   </div>
									   </div>
								   </div>
							   </li>		   	
							  </ul>
						  </div>
					</div>
					<div class="col-md-4">
						<a href="#" class="featured text-center animate-box" style="background-image: url(img/img_bg_3.jpg);">
							<div class="desc">
								<span class="date">05/09/2021</span>
								<h3>When i'm gone</h3>
								<span class="category">Just carry on...</span>
							</div>
						</a>
						<a href="#" class="featured text-center animate-box" style="background-image: url(img/img_bg_2.jpg);">
							<div class="desc">
								<span class="date">Dec 25, 2016</span>
								<h3>Most Beautiful Website in 2016</h3>
								<span class="category">Inspirational</span>
							</div>
						</a>
					</div>
				</div>
			</div>
		</aside>
	<div id="fh5co-blog-popular">
		<div class="container">
			<div class="row animate-box">
				<div class="col-md-12 col-md-offset-0 text-center fh5co-heading">
					<h2><span>Popular Post</span></h2>
				</div>
			</div>
			<div class="row">
				@foreach ($product as $key => $value)
				<div class="col-md-3">
					<div class="fh5co-blog animate-box">
						<a href="#"><img class="img-responsive" src="{{url('public/uploads/product')}}/{{$value->pr_img}}" alt=""></a>
						<div class="blog-text">
							<h3><a href="#">{{$value->pr_name}}</a></h3>
						</div> 
					</div>
				</div>
				@endforeach
			</div>
		</div>
	</div>

	<div id="fh5co-content">
		<div class="container">
			<div class="row">
				<div class="col-md-9 col-padded-right">
					<div class="row">
						<div class="col-md-12">
							<div class="fh5co-blog animate-box">
								<div class="title title-pin text-center">
									<span class="posted-on">Nov. 15th 2016</span>
									<h3><a href="#">Modeling &amp; Stylist in USA</a></h3>
									<span class="category">Lifestyle</span>
								</div>
								<a href="#"><img class="img-responsive" src="images/blog-1.jpg" alt=""></a>
								<div class="blog-text text-center">
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Dignissimos asperiores vitae velit veniam totam fuga molestias accusamus alias autem provident. Odit ab aliquam dolor eius. Dignissimos asperiores vitae velit veniam totam fuga molestias accusamus alias autem provident. Odit ab aliquam dolor eius.</p>
									<ul class="fh5co-social-icons">
										<li>Share:</li>
										<li><a href="#"><i class="icon-twitter-with-circle"></i></a></li>
										<li><a href="#"><i class="icon-facebook-with-circle"></i></a></li>
										<li><a href="#"><i class="icon-linkedin-with-circle"></i></a></li>
										<li><a href="#"><i class="icon-dribbble-with-circle"></i></a></li>
									</ul>
								</div> 
							</div>
						</div>
						<div class="col-md-6">
							<div class="fh5co-blog animate-box">
								<div class="title text-center">
									<span class="posted-on">Nov. 15th 2016</span>
									<h3><a href="#">Modeling &amp; Stylist in USA</a></h3>
									<span class="category">Lifestyle</span>
								</div>
								<a href="#"><img class="img-responsive" src="images/blog-2.jpg" alt=""></a>
								<div class="blog-text text-center">
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
									<ul class="fh5co-social-icons">
										<li>Share:</li>
										<li><a href="#"><i class="icon-twitter-with-circle"></i></a></li>
										<li><a href="#"><i class="icon-facebook-with-circle"></i></a></li>
										<li><a href="#"><i class="icon-linkedin-with-circle"></i></a></li>
										<li><a href="#"><i class="icon-dribbble-with-circle"></i></a></li>
									</ul>
								</div> 
							</div>
						</div>
						<div class="col-md-6">
							<div class="fh5co-blog animate-box">
								<div class="title text-center">
									<span class="posted-on">Nov. 15th 2016</span>
									<h3><a href="#">Modeling &amp; Stylist in USA</a></h3>
									<span class="category">Lifestyle</span>
								</div>
								<a href="#"><img class="img-responsive" src="images/blog-1.jpg" alt=""></a>
								<div class="blog-text text-center">
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
									<ul class="fh5co-social-icons">
										<li>Share:</li>
										<li><a href="#"><i class="icon-twitter-with-circle"></i></a></li>
										<li><a href="#"><i class="icon-facebook-with-circle"></i></a></li>
										<li><a href="#"><i class="icon-linkedin-with-circle"></i></a></li>
										<li><a href="#"><i class="icon-dribbble-with-circle"></i></a></li>
									</ul>
								</div> 
							</div>
						</div>
						<div class="col-md-6">
							<div class="fh5co-blog animate-box">
								<div class="title text-center">
									<span class="posted-on">Nov. 15th 2016</span>
									<h3><a href="#">Modeling &amp; Stylist in USA</a></h3>
									<span class="category">Lifestyle</span>
								</div>
								<a href="#"><img class="img-responsive" src="images/blog-2.jpg" alt=""></a>
								<div class="blog-text text-center">
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
									<ul class="fh5co-social-icons">
										<li>Share:</li>
										<li><a href="#"><i class="icon-twitter-with-circle"></i></a></li>
										<li><a href="#"><i class="icon-facebook-with-circle"></i></a></li>
										<li><a href="#"><i class="icon-linkedin-with-circle"></i></a></li>
										<li><a href="#"><i class="icon-dribbble-with-circle"></i></a></li>
									</ul>
								</div> 
							</div>
						</div>
						<div class="col-md-6">
							<div class="fh5co-blog animate-box">
								<div class="title text-center">
									<span class="posted-on">Nov. 15th 2016</span>
									<h3><a href="#">Modeling &amp; Stylist in USA</a></h3>
									<span class="category">Lifestyle</span>
								</div>
								<a href="#"><img class="img-responsive" src="images/blog-1.jpg" alt=""></a>
								<div class="blog-text text-center">
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
									<ul class="fh5co-social-icons">
										<li>Share:</li>
										<li><a href="#"><i class="icon-twitter-with-circle"></i></a></li>
										<li><a href="#"><i class="icon-facebook-with-circle"></i></a></li>
										<li><a href="#"><i class="icon-linkedin-with-circle"></i></a></li>
										<li><a href="#"><i class="icon-dribbble-with-circle"></i></a></li>
									</ul>
								</div> 
							</div>
						</div>
					</div>
				</div>
				
				<aside id="sidebar">
					<div class="col-md-3">
						<div class="side animate-box">
							<div class="col-md-12 col-md-offset-0 text-center fh5co-heading fh5co-heading-sidebar">
								<h2><span>Category</span></h2>
							</div>
							<ul class="category">
								@foreach ($category as $key => $value_cate) 
								<li><a href="{{URL::to('/danh-muc-san-pham/'.$value_cate->cate_id)}}"><i class="icon-check"></i> &ensp; {{$value_cate->cate_name}}</a></li>
								@endforeach
							</ul>
						</div>
						<div class="side animate-box">
							<div class="col-md-12 col-md-offset-0 text-center fh5co-heading fh5co-heading-sidebar">
								<h2><span>Brand</span></h2>
							</div>
							<ul class="category">
								@foreach ($brand as $key => $value_brand) 
								<li><a href="{{URL::to('/brand/'.$value_brand->br_id)}}"><i class="icon-check"></i> &ensp; {{$value_brand->br_name}}</a></li>
								@endforeach
							</ul>
						</div>
						<div class="side animate-box">
							<div class="col-md-12 col-md-offset-0 text-center fh5co-heading fh5co-heading-sidebar">
								<h2><span>About Me</span></h2>
							</div>
							<div class="fh5co-staff">
								<img src="images/user-2.jpg" alt="Free HTML5 Templates by FreeHTML5.co">
								<h3>Jean Smith</h3>
								<strong class="role">CEO, Founder</strong>
								<p>Quos quia provident conse culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita.</p>
								<ul class="fh5co-social-icons">
									<li><a href="#"><i class="icon-facebook"></i></a></li>
									<li><a href="#"><i class="icon-twitter"></i></a></li>
									<li><a href="#"><i class="icon-dribbble"></i></a></li>
									<li><a href="#"><i class="icon-github"></i></a></li>
								</ul>
							</div>
						</div>
						<div class="side animate-box">
							<div class="col-md-12 col-md-offset-0 text-center fh5co-heading fh5co-heading-sidebar">
								<h2><span>Latest Posts</span></h2>
							</div>
							<div class="blog-entry">
								<a href="#">
									<img src="images/blog-1.jpg" class="img-responsive" alt="">
									<div class="desc">
										<span class="date">Dec. 25, 2016</span>
										<h3>Most Beautiful Site in 2016</h3>
									</div>
								</a>
							</div>
							<div class="blog-entry">
								<a href="#">
									<img src="images/blog-2.jpg" class="img-responsive" alt="">
									<div class="desc">
										<span class="date">Dec. 25, 2016</span>
										<h3>Most Beautiful Site in 2016</h3>
									</div>
								</a>
							</div>
							<div class="blog-entry">
								<a href="#">
									<img src="images/blog-1.jpg" class="img-responsive" alt="">
									<div class="desc">
										<span class="date">Dec. 25, 2016</span>
										<h3>Most Beautiful Site in 2016</h3>
									</div>
								</a>
							</div>
						</div>
						
						{{-- <div class="side animate-box">
							<div class="col-md-12 col-md-offset-0 text-center fh5co-heading fh5co-heading-sidebar">
								<h2><span>Intagram</span></h2>
							</div>
							<div class="row">
								<div class="col-md-12">
									<div class="insta" style="background-image: url(images/insta-1.jpg);">
										
									</div>
								</div>
							</div>
						</div> --}}
					</div>
				</aside>

			</div>
		</div>
	</div>
@endsection