import threading, time, subprocess

def run_es():
  build_command = ["docker", "build", "-t", "my-elasticsearch-image", "."]
  run_command = ["docker", "run", "-p", "9200:9200", "-e", "discovery.type=single-node", "my-elasticsearch-image"]
  subprocess.run(build_command, check=True)
  subprocess.run(run_command, check=True)

def wait_for_elasticsearch():
    while True:
        try:
            # Attempt to make a request to Elasticsearch
            subprocess.run(["curl", "-s", "http://localhost:9200/_cat/health"], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            print("Elasticsearch is ready!")
            break
        except subprocess.CalledProcessError:
            print("Waiting for Elasticsearch...")
            time.sleep(5)

def run_frontend_backend_container():

  wait_for_elasticsearch()

  print("Starting forntend backend container now")

  # Execute docker-compose up command
  subprocess.run(["docker-compose", "up", "--build", "-d"], check=True)


thread_a = threading.Thread(target=run_es)
thread_b = threading.Thread(target=run_frontend_backend_container)

thread_a.start()
thread_b.start()

thread_a.join()
thread_b.join()



