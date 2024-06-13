<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{

    public function index()
    {
        $user = Auth::user();
        $projects = Project::where('creator_id', $user->id)->paginate(15);
        return response()->json($projects);
    }

    public function show($id)
    {
        $user = Auth::user();


        $project = Project::where('id', $id)
            ->where('creator_id', $user->id)
            ->firstOrFail();

        return response()->json($project);
    }



    public function store(StoreProjectRequest $request)
    {
        $validatedData = $request->validated();


        Project::create($validatedData);

        return response()->json("Project Created!");
    }
    
    public function update(Request $request, $id)
    {
        
        $project = Project::findOrFail($id);
    
        
        $project->name = $request->name;
        $project->start_date = $request->start_date;
        $project->end_date = $request->end_date;
        $project->value = $request->value;
        $project->status = $request->status;
        $project->creator_id = $request->creator_id;
    
        
        $project->save();
    
        
        return response()->json([
            'message' => 'Project updated successfully',
            'code' => 200,
        ]);
    }
    public function destroy($id)
    {
        $project = Project::find($id);
        if($project) {
            $project->delete();
            return response()->json([
                'message' => 'Project Deleted Successfully',
                'code' => '200',
            ]);
        }
    }
}
