<?php

App::uses('AppController', 'Controller');

class HackController extends AppController {

    public $theme = 'Battle';

    public $uses = [];

    public function beforeFilter($options = array()) {
        parent::beforeFilter($options);
    }

    public function index() {
    }
}