$(document).ready(function () {
  Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#292b2c';

  // $(".kaffy-editor").each(function () {
  //   var textareaId = "#" + $(this).attr('id');
  //   ClassicEditor
  //     .create(document.querySelector(textareaId), {
  //       // toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
  //       toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|', 'indent', 'outdent', '|', 'insertTable', '|', 'undo', 'redo']
  //     })
  //     .then(editor => {
  //       window.editor = editor;
  //     })
  //     .catch(err => {
  //       console.error(err.stack);
  //     });
  // });


  const textAreas = document.querySelectorAll('.kaffy-editor-wrapper')
  Array.from(textAreas).map(i => {
    const textareaId = $(i).attr('id');

    const editor = editormd(textareaId, {
      width  : "100%",
      height : "600",
      path   : "/kaffy/assets/vendors/js/lib/",
      lang: {
        name: "en",
        description: "Markdown",
        tocTitle: "Table of Contents",
        toolbar: {
          undo: "Undo(Ctrl+Z)",
          redo: "Redo(Ctrl+Y)",
          bold: "Bold",
          del: "Strikethrough",
          italic: "Italic",
          quote: "Block quote",
          ucwords: "Words first letter convert to uppercase",
          uppercase: "Selection text convert to uppercase",
          lowercase: "Selection text convert to lowercase",
          h1: "Heading 1",
          h2: "Heading 2",
          h3: "Heading 3",
          h4: "Heading 4",
          h5: "Heading 5",
          h6: "Heading 6",
          "list-ul": "Unordered list",
          "list-ol": "Ordered list",
          hr: "Horizontal rule",
          link: "Link",
          "reference-link": "Reference link",
          image: "Image",
          code: "Code inline",
          "preformatted-text": "Preformatted text / Code block (Tab indent)",
          "code-block": "Code block (Multi-languages)",
          table: "Tables",
          datetime: "Datetime",
          emoji: "Emoji",
          "html-entities": "HTML Entities",
          pagebreak: "Page break",
          watch: "Unwatch",
          unwatch: "Watch",
          preview: "HTML Preview (Press Shift + ESC exit)",
          fullscreen: "Fullscreen (Press ESC exit)",
          clear: "Clear",
          search: "Search",
          help: "Help",
          info: "About "
        },
        buttons: {
          enter: "Enter",
          cancel: "Cancel",
          close: "Close"
        },
        dialog: {
          link: {
            title: "Link",
            url: "Address",
            urlTitle: "Title",
            urlEmpty: "Error: Please fill in the link address."
          },
          referenceLink: {
            title: "Reference link",
            name: "Name",
            url: "Address",
            urlId: "ID",
            urlTitle: "Title",
            nameEmpty: "Error: Reference name can't be empty.",
            idEmpty: "Error: Please fill in reference link id.",
            urlEmpty: "Error: Please fill in reference link url address."
          },
          image: {
            title: "Image",
            url: "Address",
            link: "Link",
            alt: "Title",
            uploadButton: "Upload",
            imageURLEmpty: "Error: picture url address can't be empty.",
            uploadFileEmpty: "Error: upload pictures cannot be empty!",
            formatNotAllowed: "Error: only allows to upload pictures file, upload allowed image file format:"
          },
          preformattedText: {
            title: "Preformatted text / Codes",
            emptyAlert: "Error: Please fill in the Preformatted text or content of the codes.",
            placeholder: "coding now...."
          },
          codeBlock: {
            title: "Code block",
            selectLabel: "Languages: ",
            selectDefaultText: "select a code language...",
            otherLanguage: "Other languages",
            unselectedLanguageAlert: "Error: Please select the code language.",
            codeEmptyAlert: "Error: Please fill in the code content.",
            placeholder: "coding now...."
          },
          htmlEntities: {
            title: "HTML Entities"
          },
          help: {
            title: "Help"
          }
        }

      }
    })
  })


  $(".kaffy-filter").change(function () {
    var selectFilter = $(this);
    var fieldName = selectFilter.data('field-name');
    var fieldValue = selectFilter.val();
    var filterForm = $("#kaffy-filters-form");
    filterForm.children("input#custom-filter-" + fieldName).val(fieldValue);
    filterForm.submit();
  });

  $(".list-action").submit(function () {
    var actionForm = $(this);
    var selected = $.map($("input.kaffy-resource-checkbox:checked"), function (e) {
      return $(e).val();
    }).filter(function (n) {
      return n != "";
    }).join();

    $("<input />").attr("type", "hidden").attr("name", "ids").attr("value", selected).appendTo(actionForm);

    return true;
  });

  $('#kaffy-search-field').on('keypress', function (e) {
    if (e.which === 13) {
      var value = $(this).val();
      var filterForm = $("#kaffy-filters-form");
      filterForm.children("input#kaffy-filter-search").val(value);
      filterForm.submit();
    }
  });

  $("#kaffy-search-form").submit(function (event) {
    var value = $("#kaffy-search-field").val();
    var filterForm = $("#kaffy-filters-form");
    filterForm.children("input#kaffy-filter-search").val(value);
    filterForm.submit();
    event.preventDefault();
  });

  $("a#pick-raw-resource").click(function () {
    var link = $(this).attr("href");
    window.open(link, "_blank");
    return false;
  });

  if ($("div#pick-resource").length) {
    $("body").on("click", "td a", function () {
      var link = $(this);
      var theParent = $(window.opener.document);
      var field_name = $("#pick-field-name").html();
      var path_parts = link.attr("href").split("/");
      var record_id = path_parts[path_parts.length - 1];
      var field_id = "input#" + field_name;
      theParent.find(field_id).val(record_id);
      window.close();
      return false;
    });
  }

  $("a.kaffy-order-field").click(function () {
    var a = $(this);
    var field = a.data('field');
    var order = a.data('order');
    var filterForm = $("#kaffy-filters-form");
    filterForm.children("input#kaffy-order-field").val(field);
    filterForm.children("input#kaffy-order-way").val(order);
    filterForm.children("input#kaffy-filter-page").val(1);
    filterForm.submit();
    event.preventDefault();
  })

  $(".kaffy-chart").each(function () {
    var currentChart = $(this);
    var chartId = currentChart.children("canvas").first().attr('id');
    var xAxis = currentChart.children("div.values").first().children("span.x-axis").first().text().split(",");
    var yTitle = currentChart.children("div.values").first().children("span.y-title").first().text();
    var yAxis = currentChart.children("div.values").first().children("span.y-axis").first().text().split(",").map(function (value) { return Number(value); });
    var ctx = document.getElementById(chartId);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: xAxis,
        datasets: [{
          label: yTitle,
          lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,117,216,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: yAxis,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{
            // time: {
            //   unit: 'date'
            // },
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              maxTicksLimit: 5,
              padding: 10,
              // Include a dollar sign in the ticks
              // callback: function (value, index, values) {
              //   return '$' + number_format(value);
              // }
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: 'index',
          caretPadding: 10,
          // callbacks: {
          //   label: function (tooltipItem, chart) {
          //     var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          //     return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
          //   }
          // }
        }
      }
    });
  });
});