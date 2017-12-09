/**
 * Created by apple on 17/12/3.
 */
/*放大镜开始*/
$('.color_change img').on('click',function () {
    $(this).addClass('hover').parent().siblings().find('img').removeClass('hover');
    var $src = $(this).attr('src');
    var i = $src.indexOf('.');
    var $path = $src.substring(0,i);
    var $format = $src.substring(i);
    $('#bigImg').attr('src',$path+'_one_small'+$format);

});