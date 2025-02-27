<?php

namespace App\Service;

use Illuminate\Support\Facades\Http;

class PokeApiService
{
    private $pokeApiUrl = "https://pokeapi.co/api/v2/pokemon?limit=1118";

    public function searchAll($name, $page, $pageSize)
    {
        $response = Http::get($this->pokeApiUrl);
        $data = $response->json();

        $filteredByName = array_filter($data['results'], function ($pokemon) use ($name) {
            return stripos($pokemon['name'], $name) !== false;
        });

        $offset = ($page - 1) * $pageSize;
        $paginatedResults = array_slice(array_values($filteredByName), $offset, $pageSize);

        return [
            "total" => count($filteredByName),
            "page" => $page,
            "page_size" => $pageSize,
            "results" => $paginatedResults
        ];
    }

    public function getByUrl($url)
    {
        $response = Http::get($url);
        $data = $response->json();

        return [
            "id" => $data['id'],
            "name" => $data['name'],
            "img" => $data['sprites']['front_default'],
        ];
    }

}
