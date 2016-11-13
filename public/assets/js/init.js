$(document).ready(function(){
  $('.button-collapse').sideNav();
  $('.modal-trigger').leanModal();

  $('ul.tabs').tabs('select_tab', 'tab_id');

  $('#tahun').mask('0000');
  $('#stok').mask('0000',{reverse:true});
  $('#harga').mask('0000000',{reverse:true});
  $('#no_induk').mask('00000000000000000000',{reverse:true});
  $('#no_classification').mask('0000000000',{reverse:true});

  $('.js-select-penerbit').select2();
  $('.js-select-bahasa').select2();
  $('.js-select-sumber').select2();
  $('.js-select-rak').select2();
  $('.js-select-format').select2();

  $('#autocomplete-card').on('keyup',function(){
    $('.autocomplete-content').remove();
    $('label[for=autocomplete-card]').after('<ul class="autocomplete-content dropdown-content"></ul>');
    $('.autocomplete-content').html('');
    $.ajax({
      url: 'http://110.232.89.67/akasia/api/students?nomor_kartu='+$('#autocomplete-card').val(),
      type: 'get',
      data: {},
      success:function(data){
        $.each(data.siswa,function(index,item){
          $('.autocomplete-content').append('<li class="card-li"><span class="highlight"><i class="material-icons left">account_circle</i>'+item.nama_lengkap+' ('+item.nomor_kartu+')</span><span class="hide-card">'+item.nomor_kartu+'</span></li>');
        });
      }
    });
  });

  $(document).on('click','.card-li',function(){
    var cardChar = $(this).find('.hide-card').html();
    $('#autocomplete-card').val(cardChar);
    $('.autocomplete-content').remove();
  });

  $('#autocomplete-card-edit').on('keyup',function(){
    $('.autocomplete-content').remove();
    $('label[for=autocomplete-card-edit]').after('<ul class="autocomplete-content dropdown-content"></ul>');
    $('.autocomplete-content').html('');
    $.ajax({
      url: 'http://localhost:8000/api/siswa?nomor_kartu='+$('#autocomplete-card-edit').val(),
      type: 'get',
      data: {},
      success:function(data){
        $.each(data.siswa,function(index,item){
          $('.autocomplete-content').append('<li class="card-li-edit"><span class="highlight"><i class="material-icons left">account_circle</i>'+item.nama_lengkap+' ('+item.nomor_kartu+')</span><span class="hide-card">'+item.nomor_kartu+'</span></li>');
        });
      }
    });
  });

  $(document).on('click','.card-li-edit',function(){
    var cardChar = $(this).find('.hide-card').html();
    $('#autocomplete-card-edit').val(cardChar);
    $('.autocomplete-content').remove();
  });

  var headheight = $('nav').height()+20;
  var sideheight = window.innerHeight-headheight;
  $('#slide-out').height(sideheight);
  $('#slide-out').perfectScrollbar();

  $(window).resize(function(){
    var headheight = $('nav').height()+20;
    var sideheight = window.innerHeight-headheight;
    $('#slide-out').height(sideheight);
    $('#slide-out').perfectScrollbar('update');
  });

  $('.button-collapse').click(function(){
    var headheight = $('nav').height()+20;
    var sideheight = window.innerHeight-headheight;
    $('#slide-out').height(sideheight);
    $('#slide-out').perfectScrollbar('update');
  });

  $('#barcode-focused').click(function(){
    if ($('#barcode-focused:checked').length>0) {
      $('#barcode').focus();
    }

    else {
      $('#barcode').blur();
    }
  })
});
$.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
