<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Employee;

class ActiveStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:active-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $ref = Employee::select('id','incremented')
            ->where('active_status', 'Active')
            ->where('incremented', '>', 60)
            ->get();

        sleep(60);
        foreach ($ref as $key) {
            $current = Employee::find($ref->id);

            if($ref->incremented != $current->incremented) {
                $current->active_status = 'Offline';
                $current->incremented = 0;
                $current->save();
            }
        }
    }
}
