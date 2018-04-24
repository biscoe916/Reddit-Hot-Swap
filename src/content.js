'use strict';
import $ from 'jquery';

let bestButton = $('a.choice[href="https://www.reddit.com/"]');
bestButton.attr('href', 'https://www.reddit.com?rhs_uc=1');