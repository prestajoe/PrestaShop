/*
 * 2007-2011 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 *  @author PrestaShop SA <contact@prestashop.com>
 *  @copyright  2007-2011 PrestaShop SA
 *  @version  Release: $Revision: 7040 $
 *  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */

function addProductRule()
{
    product_rules_counter += 1;
    if ($('#product_rule_type').val() != 0)
        $.get(
            'ajax-tab.php',
            {controller:'AdminCartRules',token:currentToken,newProductRule:1,product_rule_type:$('#product_rule_type').val(),product_rule_id:product_rules_counter},
            function(content) {
                if (content != "")
                    $('#product_rule_table').append(content);
            }
        );
}

function removeProductRule(id)
{
    $('#product_rule_' + id + '_tr').remove();
}

function toggleCartRuleFilter(id)
{
    if ($(id).attr('checked'))
        $('#' + $(id).attr('id') + '_div').show(400);
    else
        $('#' + $(id).attr('id') + '_div').hide(200);
}

function removeCartRuleOption(item)
{
    var id = $(item).attr('id').replace('_remove', '');
    $('#' + id + '_2 option:selected').remove().appendTo('#' + id + '_1');
}

function addCartRuleOption(item)
{
    var id = $(item).attr('id').replace('_add', '');
    $('#' + id + '_1 option:selected').remove().appendTo('#' + id + '_2');
}

function updateProductRuleShortDescription(item)
{
    var id1 = $(item).attr('id').replace('_add', '').replace('_remove', '');
    var id2 = id1.replace('_select', '');
    var length = $('#' + id1 + '_2 option').length;
    if (length == 1)
        $('#' + id2 + '_match').val($('#' + id1 + '_2 option').first().text().trim());
    else
        $('#' + id2 + '_match').val(length);
}

var restrictions = new Array('country', 'carrier', 'group', 'cart_rule');
for (i in restrictions)
{
    toggleCartRuleFilter($('#' + restrictions[i] + '_restriction'));
    $('#' + restrictions[i] + '_restriction').click(function() {toggleCartRuleFilter(this);});
    $('#' + restrictions[i] + '_select_remove').click(function() {removeCartRuleOption(this);});
    $('#' + restrictions[i] + '_select_add').click(function() {addCartRuleOption(this);});
}
toggleCartRuleFilter($('#product_restriction'));
$('#product_restriction').click(function() {toggleCartRuleFilter(this);});

function toggleApplyDiscount(percent, amount, apply_to)
{
    if (percent)
    {
        $('#apply_discount_percent_div').show(400);
        if ($('#apply_discount_to_product').attr('checked'))
            toggleApplyDiscountTo();
        $('#apply_discount_to_cheapest').removeAttr('disabled');
        $('#apply_discount_to_cheapest').removeAttr('checked');
    }
    else
    {
        $('#apply_discount_percent_div').hide(200);
        $('#reduction_percent').val('0');
        $('#apply_discount_to_cheapest').attr('disabled', 'disabled');
    }

    if (amount)
    {
        $('#apply_discount_amount_div').show(400);
        if ($('#apply_discount_to_product').attr('checked'))
            toggleApplyDiscountTo();
        $('#apply_discount_to_cheapest').attr('disabled', 'disabled');
        $('#apply_discount_to_cheapest').removeAttr('checked');
    }
    else
    {
        $('#apply_discount_amount_div').hide(200);
        $('#reduction_amount').val('0');
        $('#apply_discount_to_cheapest').removeAttr('disabled');
    }

    if (apply_to)
        $('#apply_discount_to_div').show(400);
    else
    {
        toggleApplyDiscountTo();
        $('#apply_discount_to_div').hide(200);
    }
}

function toggleApplyDiscountTo()
{
    if ($('#apply_discount_to_product').attr('checked'))
        $('#apply_discount_to_product_div').show(400);
    else
    {
        $('#apply_discount_to_product_div').hide(200);
        $('#reductionProductFilter').val('');
        if ($('#apply_discount_to_order').attr('checked'))
            $('#reduction_product').val('0');
        if ($('#apply_discount_to_cheapest').attr('checked'))
            $('#reduction_product').val('-1');
        if ($('#apply_discount_to_selection').attr('checked'))
            $('#reduction_product').val('-2');
    }
}

function toggleGiftProduct()
{
    if ($('#free_gift_on').attr('checked'))
        $('#free_gift_div').show(400);
    else
    {
        $('#gift_product').val('0');
        $('#giftProductFilter').val('');
        $('#free_gift_div').hide(200);
    }
}

$('#apply_discount_percent').click(function() {toggleApplyDiscount(true, false, true);});
if ($('#apply_discount_percent').attr('checked'))
    toggleApplyDiscount(true, false, true);

$('#apply_discount_amount').click(function() {toggleApplyDiscount(false, true, true);});
if ($('#apply_discount_amount').attr('checked'))
    toggleApplyDiscount(false, true, true);

$('#apply_discount_off').click(function() {toggleApplyDiscount(false, false, false);});
if ($('#apply_discount_off').attr('checked'))
    toggleApplyDiscount(false, false, false);

$('#apply_discount_to_order').click(function() {toggleApplyDiscountTo();});
if ($('#apply_discount_to_order').attr('checked'))
    toggleApplyDiscountTo();

$('#apply_discount_to_product').click(function() {toggleApplyDiscountTo();});
if ($('#apply_discount_to_product').attr('checked'))
    toggleApplyDiscountTo();

$('#apply_discount_to_cheapest').click(function() {toggleApplyDiscountTo();});
if ($('#apply_discount_to_cheapest').attr('checked'))
    toggleApplyDiscountTo();

$('#apply_discount_to_selection').click(function() {toggleApplyDiscountTo();});
if ($('#apply_discount_to_selection').attr('checked'))
    toggleApplyDiscountTo();

$('#free_gift_on').click(function() {toggleGiftProduct();});
$('#free_gift_off').click(function() {toggleGiftProduct();});
toggleGiftProduct();

// Main form submit
$('#cart_rule_form').submit(function() {
    if ($('#customerFilter').val() == '')
        $('#id_customer').val('0');

    for (i in restrictions)
    {
        if ($('#' + restrictions[i] + '_select_1 option').length == 0)
            $('#' + restrictions[i] + '_restriction').removeAttr('checked');
        else
        {
            $('#' + restrictions[i] + '_select_2 option').each(function(i) {
                $(this).attr('selected', 'selected');
            });
        }
    }

    $('.product_rule_toselect option').each(function(i) {
        $(this).attr('selected', 'selected');
    });
});

$('#giftProductFilter')
    .autocomplete(
    'ajax-tab.php', {
        minChars: 2,
        max: 50,
        width: 500,
        selectFirst: false,
        scroll: false,
        dataType: 'json',
        formatItem: function(data, i, max, value, term) {
            return value;
        },
        parse: function(data) {
            var mytab = new Array();
            for (var i = 0; i < data.length; i++)
                mytab[mytab.length] = { data: data[i], value: (data[i].reference + ' ' + data[i].name).trim() };
            return mytab;
        },
        extraParams: {
            controller: 'AdminCartRules',
            token: currentToken,
            giftProductFilter: 1
        }
    }
)
    .result(function(event, data, formatted) {
        $('#gift_product').val(data.id_product);
        $('#giftProductFilter').val((data.reference + ' ' + data.name).trim());
    });

$('#reductionProductFilter')
    .autocomplete(
    'ajax-tab.php', {
        minChars: 2,
        max: 50,
        width: 500,
        selectFirst: false,
        scroll: false,
        dataType: 'json',
        formatItem: function(data, i, max, value, term) {
            return value;
        },
        parse: function(data) {
            var mytab = new Array();
            for (var i = 0; i < data.length; i++)
                mytab[mytab.length] = { data: data[i], value: (data[i].reference + ' ' + data[i].name).trim() };
            return mytab;
        },
        extraParams: {
            controller: 'AdminCartRules',
            token: currentToken,
            reductionProductFilter: 1
        }
    }
)
    .result(function(event, data, formatted) {
        $('#reduction_product').val(data.id_product);
        $('#reductionProductFilter').val((data.reference + ' ' + data.name).trim());
    });

$('#customerFilter')
    .autocomplete(
    'ajax-tab.php', {
        minChars: 2,
        max: 50,
        width: 500,
        selectFirst: false,
        scroll: false,
        dataType: 'json',
        formatItem: function(data, i, max, value, term) {
            return value;
        },
        parse: function(data) {
            var mytab = new Array();
            for (var i = 0; i < data.length; i++)
                mytab[mytab.length] = { data: data[i], value: data[i].cname + ' (' + data[i].email + ')' };
            return mytab;
        },
        extraParams: {
            controller: 'AdminCartRules',
            token: currentToken,
            customerFilter: 1
        }
    }
)
    .result(function(event, data, formatted) {
        $('#id_customer').val(data.id_customer);
        $('#customerFilter').val(data.cname + ' (' + data.email + ')');
    });

function displayCartRuleTab(tab)
{
    $('.cart_rule_tab').hide();
    $('.tab-page').removeClass('selected');
    $('#cart_rule_' + tab).show();
    $('#cart_rule_link_' + tab).addClass('selected');
    $('#currentFormTab').val(tab);
}

$('.cart_rule_tab').hide();
$('.tab-page').removeClass('selected');
$('#cart_rule_' + currentFormTab).show();
$('#cart_rule_link_' + currentFormTab).addClass('selected');

var date = new Date();
var hours = date.getHours();
if (hours < 10)
    hours = "0" + hours;
var mins = date.getMinutes();
if (mins < 10)
    mins = "0" + mins;
var secs = date.getSeconds();
if (secs < 10)
    secs = "0" + secs;
$('.datepicker').datepicker({
    prevText: '',
    nextText: '',
    dateFormat: 'yy-mm-dd ' + hours + ':' + mins + ':' + secs
});
