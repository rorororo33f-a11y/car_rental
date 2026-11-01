var carsData = {
    "CR-001": { model: "Toyota Corolla", price: 250000 },
    "CR-002": { model: "Kia Sportage", price: 400000 },
    "CR-003": { model: "Hyundai Elantra", price: 300000 },
    "CR-004": { model: "Chevrolet Spark", price: 180000 },
    "CR-005": { model: "Nissan Sunny", price: 220000 }
};

$(document).ready(function () {

    // اظهار واخفاء التفاصيل
    $("input[name='showDetails']").change(function () {
        var carId = $(this).val();
        $("#details-" + carId).toggle();
    });

    // زر متابعة
    $("#btnContinue").click(function () {
        var selected = $("input[name='selectCar']:checked");
        if (selected.length === 0) {
            alert("يرجى اختيار سيارة واحدة على الاقل");
            return;
        }
        $("#bookingFormSection").show();
    });

});

function validateAndSubmit() {
    $(".error").text("");

    var fullName = $("#fullName").val().trim();
    var nationalId = $("#nationalId").val().trim();
    var startDate = $("#startDate").val().trim();
    var endDate = $("#endDate").val().trim();
    var mobile = $("#mobile").val().trim();
    var email = $("#email").val().trim();

    var isValid = true;

    // التحقق من الاسم
    if (fullName !== "" && !/^[\u0600-\u06FF\s]+$/.test(fullName)) {
        $("#errName").text("الاسم يجب ان يكون احرف عربية فقط");
        isValid = false;
    }

    // الرقم الوطني
    if (!/^\d{11}$/.test(nationalId) || parseInt(nationalId.substring(0, 2)) < 1 || parseInt(nationalId.substring(0, 2)) > 14) {
        $("#errNationalId").text("الرقم الوطني يجب ان يكون 11 رقم واول خانتين من 01 الى 14");
        isValid = false;
    }

    // تاريخ البداية
    if (startDate === "" || !/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
        $("#errStartDate").text("ادخل تاريخ بداية صحيح بصيغة yyyy-mm-dd");
        isValid = false;
    }

    // تاريخ النهاية
    if (endDate === "" || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
        $("#errEndDate").text("ادخل تاريخ نهاية صحيح بصيغة yyyy-mm-dd");
        isValid = false;
    } else if (startDate !== "" && new Date(endDate) <= new Date(startDate)) {
        $("#errEndDate").text("تاريخ النهاية يجب ان يكون بعد تاريخ البداية");
        isValid = false;
    }

    // الموبايل
    if (mobile !== "" && !/^09(0|3|4|5|6|8|9)\d{7}$/.test(mobile)) {
        $("#errMobile").text("رقم الموبايل غير صحيح");
        isValid = false;
    }

    // الايميل
    if (email !== "" && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        $("#errEmail").text("الايميل غير صحيح");
        isValid = false;
    }

    if (!isValid) {
        return false;
    }

    // حساب النتيجة
    var days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    var total = 0;
    var html = "<h3>ملخص الحجز</h3>";
    html += "<p>من " + startDate + " الى " + endDate + " (" + days + " يوم)</p><ul>";

    $("input[name='selectCar']:checked").each(function () {
        var carId = $(this).val();
        var car = carsData[carId];
        if (car) {
            var carTotal = car.price * days;
            total += carTotal;
            html += "<li>" + car.model + " : " + car.price + " × " + days + " = " + carTotal + " ل.س</li>";
        }
    });

    html += "</ul>";

    if (days > 10) {
        var discount = total * 0.05;
        total = total - discount;
        html += "<p>تم تطبيق خصم 5% : -" + discount + " ل.س</p>";
    }

    html += "<p><strong>المبلغ النهائي : " + total + " ل.س</strong></p>";

    $("#resultContent").html(html);
    $("#resultBox").show();

    return false;
}