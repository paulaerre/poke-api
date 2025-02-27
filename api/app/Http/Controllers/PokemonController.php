<?php

namespace App\Http\Controllers;

use App\Service\PokeApiService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PokemonController extends Controller
{
    private PokeApiService $pokeApiService;

    public function __construct(PokeApiService $pokeApiService)
    {
        $this->pokeApiService = $pokeApiService;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function search(Request $request)
    {
        //
        $body = json_decode($request->getContent());
        $name = $body->name;
        $page = $body->page;
        $pageSize = $body->pageSize;

        $result = $this->pokeApiService->searchAll($name, $page, $pageSize);
        return $result;
    
    }

    public function getByUrl(Request $request)
    {
        $url = $request->query->get('url');

        $result = $this->pokeApiService->getByUrl($url);
        return $result;
    
    }

}
