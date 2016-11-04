ALTER TABLE `wishlists` CHANGE `status` `status` ENUM('0','1','2') NOT NULL DEFAULT '0' COMMENT '0 - Inactive, 1- Active, 2- On Cart';

ALTER TABLE `wishlists` CHANGE `sku_id` `product_id` INT(11) NOT NULL;

ALTER TABLE `wishlists` ADD `count` INT NOT NULL DEFAULT '0' AFTER `status`;
