<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Product\ProductRepository;
use App\Exception\InvalidFileException;
use App\Helpers\Validator\FileValidator;
use App\Helpers\File\FileUploader;
use App\Helpers\Response\Response;

class ProductController extends Controller
{

    public function insert(Request $request){ 
        try{
            $requestParams = json_decode($request->input('json'),true);

            // upload image
            FileValidator::validate($request->file('file'),'mimes:jpeg,gif,png|required');
            $requestParams['file'] = FileUploader::upload($request->file('file'),'public');

            $repo = new ProductRepository();
            $product = $repo->insert($requestParams);

            $data = Response::success('Producto subido','producto',$product);

        }catch(InvalidFileException $e){
            $data= Response::error(200,$e->getMessage());
        }
        return $data;
    }
}
